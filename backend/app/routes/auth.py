
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    BackgroundTasks,
)
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserLogin, UserRegister, UserResponse
from app.utils.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.utils.email_service import (
    send_welcome_email,
    send_login_alert,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

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
