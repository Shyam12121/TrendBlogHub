import os
import random
from datetime import datetime, timedelta

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    BackgroundTasks,
)
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import (
    UserLogin,
    UserRegister,
    UserResponse,
    ForgotPasswordRequest,
    VerifyOtpRequest,
    ResetPasswordRequest,
)
from app.utils.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.utils.email_service import (
    send_welcome_email,
    send_login_alert,
    send_otp_email,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
OTP_EXPIRE_MINUTES = int(os.getenv("OTP_EXPIRE_MINUTES", 10))

# In-memory OTP store (production me Redis use karo)
# { email: { "otp": "123456", "expires_at": datetime, "reset_token": "..." } }
OTP_STORE: dict = {}


# ==========================================
# REGISTER
# ==========================================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Check if user exists
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Create new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role="user",
        is_active=True,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send welcome email after successful registration
    background_tasks.add_task(
        send_welcome_email,
        new_user.email,
        new_user.name,
    )

    return new_user


# ==========================================
# LOGIN - Mobile Friendly
# ==========================================

@router.post("/login")
def login(
    response: Response,
    user_data: UserLogin,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Find user
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Verify password
    if not verify_password(user_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Check account status
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    # Create access token
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    # Set cookie - Mobile friendly
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # HTTP ke liye False; HTTPS par True use karein
        samesite="lax",
        max_age=86400,  # 24 hours
        path="/",
    )

    # Send login alert only after successful login
    background_tasks.add_task(
        send_login_alert,
        user.email,
        user.name,
    )

    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
        },
    }


# ==========================================
# CURRENT USER
# ==========================================

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


# ==========================================
# LOGOUT
# ==========================================

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")

    return {
        "success": True,
        "message": "Logged out successfully",
    }


# ==========================================
# FORGOT PASSWORD — email par OTP bhejta hai
# ==========================================

@router.post("/forgot-password")
def forgot_password(
    body: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == body.email)
        .first()
    )

    # Security: user na mile to bhi same response do
    if not user:
        return {
            "message": "If that email is registered, an OTP has been sent."
        }

    otp = f"{random.randint(0, 999999):06d}"
    expires_at = datetime.utcnow() + timedelta(
        minutes=OTP_EXPIRE_MINUTES
    )

    OTP_STORE[body.email] = {
        "otp": otp,
        "expires_at": expires_at,
        "reset_token": None,
    }

    # Background me OTP email bhejo (same pattern jo register/login me hai)
    background_tasks.add_task(
        send_otp_email,
        body.email,
        otp,
    )

    return {"message": "OTP sent to your email."}


# ==========================================
# VERIFY OTP — OTP check karke reset_token deta hai
# ==========================================

@router.post("/verify-otp")
def verify_otp(body: VerifyOtpRequest):
    record = OTP_STORE.get(body.email)

    if not record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No OTP request found for this email.",
        )

    if datetime.utcnow() > record["expires_at"]:
        OTP_STORE.pop(body.email, None)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired. Please request a new one.",
        )

    if record["otp"] != body.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP.",
        )

    reset_token = jwt.encode(
        {
            "sub": body.email,
            "purpose": "password_reset",
            "exp": datetime.utcnow() + timedelta(minutes=15),
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    record["reset_token"] = reset_token

    return {
        "message": "OTP verified.",
        "reset_token": reset_token,
    }


# ==========================================
# RESET PASSWORD — naya password set karta hai
# ==========================================

@router.post("/reset-password")
def reset_password(
    body: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    record = OTP_STORE.get(body.email)

    if not record or record["otp"] != body.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP session.",
        )

    if record.get("reset_token") != body.reset_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reset token.",
        )

    try:
        payload = jwt.decode(
            body.reset_token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        if (
            payload.get("purpose") != "password_reset"
            or payload.get("sub") != body.email
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid reset token.",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token expired or invalid.",
        )

    # Password strength validation
    if len(body.new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters.",
        )

    if not any(c.isupper() for c in body.new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include an uppercase letter.",
        )

    if not any(c.isdigit() for c in body.new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include a number.",
        )

    user = (
        db.query(User)
        .filter(User.email == body.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    # ✅ Aapke model me field ka naam "password" hai
    user.password = hash_password(body.new_password)
    db.commit()

    OTP_STORE.pop(body.email, None)

    return {"message": "Password reset successfully."}