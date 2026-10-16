from typing import Optional

from pydantic import (
    BaseModel,
    EmailStr,
    ConfigDict,
    Field,
)


# ======================================================
# USER REGISTER
# ======================================================

class UserRegister(BaseModel):

    name: str

    email: EmailStr

    password: str


# ======================================================
# USER LOGIN
# ======================================================

class UserLogin(BaseModel):

    email: EmailStr

    password: str


# ======================================================
# USER RESPONSE
# ======================================================

class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )


# ======================================================
# PROFILE RESPONSE
# ======================================================

class ProfileResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    first_name: Optional[str] = None

    last_name: Optional[str] = None

    username: Optional[str] = None

    country: Optional[str] = None

    location: Optional[str] = None

    website: Optional[str] = None

    bio: Optional[str] = None

    avatar: Optional[str] = None

    cover_image: Optional[str] = None

    role: str

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )


# ======================================================
# PUBLIC PROFILE RESPONSE
# ======================================================

class PublicProfileResponse(BaseModel):

    id: int

    name: str

    first_name: Optional[str] = None

    last_name: Optional[str] = None

    username: Optional[str] = None

    country: Optional[str] = None

    location: Optional[str] = None

    website: Optional[str] = None

    bio: Optional[str] = None

    avatar: Optional[str] = None

    cover_image: Optional[str] = None

    role: str

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )


# ======================================================
# UPDATE PROFILE
# ======================================================

class ProfileUpdate(BaseModel):

    first_name: Optional[str] = Field(
        default=None,
        max_length=100,
    )

    last_name: Optional[str] = Field(
        default=None,
        max_length=100,
    )

    username: Optional[str] = Field(
        default=None,
        max_length=100,
    )

    country: Optional[str] = Field(
        default=None,
        max_length=100,
    )

    location: Optional[str] = Field(
        default=None,
        max_length=255,
    )

    website: Optional[str] = Field(
        default=None,
        max_length=500,
    )

    bio: Optional[str] = Field(
        default=None,
        max_length=200,
    )


# ======================================================
# CHANGE PASSWORD
# ======================================================

class ChangePassword(BaseModel):

    current_password: str

    new_password: str = Field(
        min_length=6,
        max_length=100,
    )


# ======================================================
# UPDATE USER ROLE
# ======================================================

class UserRoleUpdate(BaseModel):

    role: str


# ======================================================
# UPDATE USER STATUS
# ======================================================

class UserStatusUpdate(BaseModel):

    is_active: bool


# ======================================================
# FORGOT PASSWORD — request OTP
# ======================================================

class ForgotPasswordRequest(BaseModel):

    email: EmailStr


# ======================================================
# VERIFY OTP
# ======================================================

class VerifyOtpRequest(BaseModel):

    email: EmailStr

    otp: str


# ======================================================
# RESET PASSWORD
# ======================================================

class ResetPasswordRequest(BaseModel):

    email: EmailStr

    otp: str

    reset_token: str

    new_password: str