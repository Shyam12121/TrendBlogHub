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

    first_name: str

    last_name: str

    username: str

    country: str

    location: str

    website: str

    bio: str

    avatar: str

    cover_image: str

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

    first_name: str

    last_name: str

    username: str

    country: str

    location: str

    website: str

    bio: str

    avatar: str

    cover_image: str

    role: str

    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )


# ======================================================
# UPDATE PROFILE
# ======================================================

class ProfileUpdate(BaseModel):

    first_name: str = Field(
        default=None,
        max_length=100,
    )

    last_name: str = Field(
        default=None,
        max_length=100,
    )

    username: str = Field(
        default=None,
        max_length=100,
    )

    country: str = Field(
        default=None,
        max_length=100,
    )

    location: str = Field(
        default=None,
        max_length=255,
    )

    website: str = Field(
        default=None,
        max_length=500,
    )

    bio: str = Field(
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
