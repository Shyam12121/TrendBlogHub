import os
import uuid

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    UploadFile,
    File,
    Request,
)
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.blog import Blog

from app.schemas.user import (
    ProfileResponse,
    ProfileUpdate,
    ChangePassword,
    PublicProfileResponse,
)

from app.utils.security import (
    get_current_user,
    hash_password,
    verify_password,
)


router = APIRouter(
    prefix="/profile",
    tags=["User Profile"],
)


# ======================================================
# UPLOAD DIRECTORIES
# ======================================================

# backend/
#   app/
#   uploads/

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads",
)

AVATAR_DIR = os.path.join(
    UPLOAD_DIR,
    "avatars",
)

COVER_DIR = os.path.join(
    UPLOAD_DIR,
    "covers",
)


os.makedirs(
    AVATAR_DIR,
    exist_ok=True,
)

os.makedirs(
    COVER_DIR,
    exist_ok=True,
)


# ======================================================
# IMAGE SETTINGS
# ======================================================

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}

MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB


# ======================================================
# HELPER - DELETE OLD LOCAL IMAGE
# ======================================================

def delete_old_local_file(
    image_url,
    directory,
    folder_name,
):
    """
    Delete the previously uploaded local image.

    Only files inside our own uploads folder are removed.
    External URLs are ignored.
    """

    if not image_url:
        return

    marker = f"/uploads/{folder_name}/"

    if marker not in image_url:
        return

    old_filename = image_url.split(
        marker,
        1,
    )[-1]

    if not old_filename:
        return

    # Security: prevent path traversal
    old_filename = os.path.basename(
        old_filename
    )

    old_path = os.path.join(
        directory,
        old_filename,
    )

    if os.path.exists(old_path):
        try:
            os.remove(old_path)
        except OSError:
            pass


# ======================================================
# GET CURRENT LOGGED-IN USER PROFILE
# GET /profile/me
# ======================================================

@router.get(
    "/me",
    response_model=ProfileResponse,
)
def get_profile(
    current_user: User = Depends(
        get_current_user
    ),
):
    return current_user


# ======================================================
# UPLOAD AVATAR
# POST /profile/avatar
# ======================================================

@router.post("/avatar")
async def upload_avatar(
    request: Request,
    file: UploadFile = File(...),
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # --------------------------------------------------
    # VALIDATE FILE TYPE
    # --------------------------------------------------

    if file.content_type not in ALLOWED_IMAGE_TYPES:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Only JPG, PNG, WEBP and GIF "
                "images are allowed."
            ),
        )

    # --------------------------------------------------
    # READ FILE
    # --------------------------------------------------

    contents = await file.read()

    if not contents:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded image is empty.",
        )

    # --------------------------------------------------
    # VALIDATE SIZE
    # --------------------------------------------------

    if len(contents) > MAX_IMAGE_SIZE:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image size must be less than 5 MB.",
        )

    # --------------------------------------------------
    # FILE EXTENSION
    # --------------------------------------------------

    extension = os.path.splitext(
        file.filename or ""
    )[1].lower()

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
    }

    if extension not in allowed_extensions:

        extension = ".jpg"

    # --------------------------------------------------
    # UNIQUE FILE NAME
    # --------------------------------------------------

    filename = (
        f"user_{current_user.id}_"
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    file_path = os.path.join(
        AVATAR_DIR,
        filename,
    )

    # --------------------------------------------------
    # SAVE NEW FILE
    # --------------------------------------------------

    try:

        with open(
            file_path,
            "wb",
        ) as buffer:

            buffer.write(contents)

    except OSError as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                f"Failed to save avatar: {str(e)}"
            ),
        )

    # --------------------------------------------------
    # DELETE OLD AVATAR
    # --------------------------------------------------

    delete_old_local_file(
        current_user.avatar,
        AVATAR_DIR,
        "avatars",
    )

    # --------------------------------------------------
    # CREATE PUBLIC URL
    # --------------------------------------------------

    base_url = str(
        request.base_url
    ).rstrip("/")

    avatar_url = (
        f"{base_url}/uploads/avatars/{filename}"
    )

    # --------------------------------------------------
    # SAVE URL TO MYSQL
    # --------------------------------------------------

    current_user.avatar = avatar_url

    try:

        db.commit()
        db.refresh(current_user)

    except Exception:

        db.rollback()

        # Remove newly uploaded file if DB failed
        if os.path.exists(file_path):

            try:
                os.remove(file_path)
            except OSError:
                pass

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save avatar information.",
        )

    # --------------------------------------------------
    # RESPONSE
    # --------------------------------------------------

    return {
        "success": True,
        "message": "Avatar uploaded successfully.",
        "avatar": current_user.avatar,
        "cover_image": current_user.cover_image,
        "profile": current_user,
    }


# ======================================================
# UPLOAD COVER IMAGE
# POST /profile/cover
# ======================================================

@router.post("/cover")
async def upload_cover(
    request: Request,
    file: UploadFile = File(...),
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # --------------------------------------------------
    # VALIDATE FILE TYPE
    # --------------------------------------------------

    if file.content_type not in ALLOWED_IMAGE_TYPES:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Only JPG, PNG, WEBP and GIF "
                "images are allowed."
            ),
        )

    # --------------------------------------------------
    # READ FILE
    # --------------------------------------------------

    contents = await file.read()

    if not contents:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded image is empty.",
        )

    # --------------------------------------------------
    # VALIDATE SIZE
    # --------------------------------------------------

    if len(contents) > MAX_IMAGE_SIZE:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image size must be less than 5 MB.",
        )

    # --------------------------------------------------
    # FILE EXTENSION
    # --------------------------------------------------

    extension = os.path.splitext(
        file.filename or ""
    )[1].lower()

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
    }

    if extension not in allowed_extensions:

        extension = ".jpg"

    # --------------------------------------------------
    # UNIQUE FILE NAME
    # --------------------------------------------------

    filename = (
        f"user_{current_user.id}_"
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    file_path = os.path.join(
        COVER_DIR,
        filename,
    )

    # --------------------------------------------------
    # SAVE NEW FILE
    # --------------------------------------------------

    try:

        with open(
            file_path,
            "wb",
        ) as buffer:

            buffer.write(contents)

    except OSError as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                f"Failed to save cover image: {str(e)}"
            ),
        )

    # --------------------------------------------------
    # DELETE OLD COVER
    # --------------------------------------------------

    delete_old_local_file(
        current_user.cover_image,
        COVER_DIR,
        "covers",
    )

    # --------------------------------------------------
    # CREATE PUBLIC URL
    # --------------------------------------------------

    base_url = str(
        request.base_url
    ).rstrip("/")

    cover_url = (
        f"{base_url}/uploads/covers/{filename}"
    )

    # --------------------------------------------------
    # SAVE URL TO MYSQL
    # --------------------------------------------------

    current_user.cover_image = cover_url

    try:

        db.commit()
        db.refresh(current_user)

    except Exception:

        db.rollback()

        # Remove newly uploaded file if DB failed
        if os.path.exists(file_path):

            try:
                os.remove(file_path)
            except OSError:
                pass

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Failed to save cover image information."
            ),
        )

    # --------------------------------------------------
    # RESPONSE
    # --------------------------------------------------

    return {
        "success": True,
        "message": "Cover image uploaded successfully.",
        "avatar": current_user.avatar,
        "cover_image": current_user.cover_image,
        "profile": current_user,
    }


# ======================================================
# GET ALL PUBLIC AUTHORS
# GET /profile
# ======================================================

@router.get("")
def get_public_profiles(
    db: Session = Depends(get_db),
):

    """
    Return all active users with their
    published blogs.

    Users without published blogs are also included.
    """

    users = (
        db.query(User)
        .filter(
            User.is_active == True
        )
        .order_by(
            User.created_at.desc()
        )
        .all()
    )

    result = []

    for user in users:

        published_blogs = (
            db.query(Blog)
            .filter(
                Blog.author_id == user.id,
                Blog.status == "published",
            )
            .order_by(
                Blog.created_at.desc()
            )
            .all()
        )

        blogs = []

        for blog in published_blogs:

            blogs.append({

                "id": blog.id,

                "title": blog.title,

                "slug": blog.slug,

                "content": blog.content,

                "excerpt": blog.excerpt,

                "featured_image":
                    blog.featured_image,

                "category": blog.category,

                "status": blog.status,

                "author_id": blog.author_id,

                "author_name": (
                    blog.author.name
                    if blog.author
                    else None
                ),

                "author_username": (
                    blog.author.username
                    if blog.author
                    else None
                ),

                "created_at":
                    blog.created_at,

                "updated_at":
                    blog.updated_at,
            })

        # ----------------------------------------------
        # DISPLAY NAME
        # ----------------------------------------------

        full_name = " ".join(
            part
            for part in [
                user.first_name,
                user.last_name,
            ]
            if part and part.strip()
        ).strip()

        display_name = (
            full_name
            or user.name
            or user.username
            or "Author"
        )

        # ----------------------------------------------
        # PUBLIC USER
        # ----------------------------------------------

        result.append({

            "id": user.id,

            "name": display_name,

            "first_name": user.first_name,

            "last_name": user.last_name,

            "username": user.username,

            "country": user.country,

            "location": user.location,

            "website": user.website,

            "bio": user.bio,

            "avatar": user.avatar,

            "cover_image": user.cover_image,

            "role": user.role,

            "created_at": user.created_at,

            "blog_count": len(blogs),

            "blogs": blogs,
        })

    return result


# ======================================================
# GET SINGLE PUBLIC USER PROFILE
# GET /profile/public/{username}
# ======================================================

@router.get(
    "/public/{username}",
    response_model=PublicProfileResponse,
)
def get_public_profile(
    username: str,
    db: Session = Depends(get_db),
):

    username = username.strip()

    if not username:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found",
        )

    user = (
        db.query(User)
        .filter(
            User.username == username,
            User.is_active == True,
        )
        .first()
    )

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found",
        )

    return user


# ======================================================
# UPDATE CURRENT USER PROFILE
# PUT /profile
# ======================================================

@router.put(
    "",
    response_model=ProfileResponse,
)
def update_profile(
    profile_data: ProfileUpdate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # ==================================================
    # CLEAN USERNAME
    # ==================================================

    username = (
        profile_data.username.strip()
        if profile_data.username
        else None
    )

    # ==================================================
    # CHECK USERNAME DUPLICATE
    # ==================================================

    if username:

        existing_user = (
            db.query(User)
            .filter(
                User.username == username,
                User.id != current_user.id,
            )
            .first()
        )

        if existing_user:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken",
            )

    # ==================================================
    # UPDATE FIRST NAME
    # ==================================================

    if profile_data.first_name is not None:

        current_user.first_name = (
            profile_data.first_name.strip()
        )

    # ==================================================
    # UPDATE LAST NAME
    # ==================================================

    if profile_data.last_name is not None:

        current_user.last_name = (
            profile_data.last_name.strip()
        )

    # ==================================================
    # UPDATE USERNAME
    # ==================================================

    current_user.username = username

    # ==================================================
    # UPDATE USER.NAME
    #
    # Blogs use author.name.
    # Keep it synchronized with first + last name.
    # ==================================================

    full_name = " ".join(
        part
        for part in [
            current_user.first_name,
            current_user.last_name,
        ]
        if part and part.strip()
    ).strip()

    if full_name:

        current_user.name = full_name

    # ==================================================
    # UPDATE COUNTRY
    # ==================================================

    if profile_data.country is not None:

        current_user.country = (
            profile_data.country.strip()
        )

    # ==================================================
    # UPDATE LOCATION
    # ==================================================

    if profile_data.location is not None:

        current_user.location = (
            profile_data.location.strip()
        )

    # ==================================================
    # UPDATE WEBSITE
    # ==================================================

    if profile_data.website is not None:

        current_user.website = (
            profile_data.website.strip()
        )

    # ==================================================
    # UPDATE BIO
    # ==================================================

    if profile_data.bio is not None:

        current_user.bio = (
            profile_data.bio.strip()
        )

    # ==================================================
    # SAVE
    # ==================================================

    db.commit()

    db.refresh(current_user)

    return current_user


# ======================================================
# CHANGE PASSWORD
# PUT /profile/password
# ======================================================

@router.put(
    "/password",
)
def change_password(
    password_data: ChangePassword,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # ==================================================
    # VERIFY CURRENT PASSWORD
    # ==================================================

    if not verify_password(
        password_data.current_password,
        current_user.password,
    ):

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    # ==================================================
    # PREVENT SAME PASSWORD
    # ==================================================

    if verify_password(
        password_data.new_password,
        current_user.password,
    ):

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "New password must be different "
                "from current password"
            ),
        )

    # ==================================================
    # HASH NEW PASSWORD
    # ==================================================

    current_user.password = hash_password(
        password_data.new_password
    )

    # ==================================================
    # SAVE
    # ==================================================

    db.commit()

    return {
        "success": True,
        "message": "Password changed successfully",
    }