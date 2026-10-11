from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user import User
from app.models.blog import Blog

from app.schemas.user import (
    UserResponse,
    UserRoleUpdate,
    UserStatusUpdate,
)

from app.schemas.blog import (
    BlogResponse,
    BlogStatusUpdate,
)

from app.utils.security import get_current_admin


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


# ==========================================
# ADMIN DASHBOARD
# ==========================================

@router.get("/dashboard")
def admin_dashboard(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    total_users = db.query(User).count()

    active_users = (
        db.query(User)
        .filter(User.is_active == True)
        .count()
    )

    admin_users = (
        db.query(User)
        .filter(User.role == "admin")
        .count()
    )

    normal_users = (
        db.query(User)
        .filter(User.role == "user")
        .count()
    )

    total_blogs = db.query(Blog).count()

    published_blogs = (
        db.query(Blog)
        .filter(Blog.status == "published")
        .count()
    )

    draft_blogs = (
        db.query(Blog)
        .filter(Blog.status == "draft")
        .count()
    )

    pending_blogs = (
        db.query(Blog)
        .filter(Blog.status == "pending")
        .count()
    )

    rejected_blogs = (
        db.query(Blog)
        .filter(Blog.status == "rejected")
        .count()
    )

    return {
        "message": "Welcome to Admin Dashboard",
        "admin": {
            "id": current_admin.id,
            "name": current_admin.name,
            "email": current_admin.email,
            "role": current_admin.role,
        },
        "stats": {
            "total_users": total_users,
            "active_users": active_users,
            "admin_users": admin_users,
            "normal_users": normal_users,
            "total_blogs": total_blogs,
            "published_blogs": published_blogs,
            "draft_blogs": draft_blogs,
            "pending_blogs": pending_blogs,
            "rejected_blogs": rejected_blogs,
        },
    }


# ==========================================
# GET ALL USERS
# ==========================================

@router.get(
    "/users",
    response_model=list[UserResponse],
)
def get_all_users(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    users = (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )

    return users


# ==========================================
# GET SINGLE USER
# ==========================================

@router.get(
    "/users/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


# ==========================================
# UPDATE USER ROLE
# ==========================================

@router.patch(
    "/users/{user_id}/role",
    response_model=UserResponse,
)
def update_user_role(
    user_id: int,
    role_data: UserRoleUpdate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if role_data.role not in ["user", "admin"]:
        raise HTTPException(
            status_code=400,
            detail="Role must be either 'user' or 'admin'",
        )

    if (
        user.id == current_admin.id
        and role_data.role != "admin"
    ):
        raise HTTPException(
            status_code=400,
            detail="You cannot remove your own admin role",
        )

    user.role = role_data.role

    db.commit()
    db.refresh(user)

    return user


# ==========================================
# UPDATE USER STATUS
# ==========================================

@router.patch(
    "/users/{user_id}/status",
    response_model=UserResponse,
)
def update_user_status(
    user_id: int,
    status_data: UserStatusUpdate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if (
        user.id == current_admin.id
        and status_data.is_active is False
    ):
        raise HTTPException(
            status_code=400,
            detail="You cannot deactivate your own account",
        )

    user.is_active = status_data.is_active

    db.commit()
    db.refresh(user)

    return user


# ==========================================
# GET ALL BLOGS - ADMIN
# ==========================================

@router.get(
    "/blogs",
    response_model=list[BlogResponse],
)
def get_all_blogs_admin(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    blogs = (
        db.query(Blog)
        .order_by(Blog.id.desc())
        .all()
    )

    return blogs


# ==========================================
# GET SINGLE BLOG - ADMIN
# ==========================================

@router.get(
    "/blogs/{blog_id}",
    response_model=BlogResponse,
)
def get_blog_admin(
    blog_id: int,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if blog is None:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    return blog


# ==========================================
# UPDATE BLOG STATUS - ADMIN
#
# Rules:
# - Draft blogs: locked for admin
# - Reject: sets status = "rejected"
#   (user can still edit & resubmit)
# - Cannot move submitted blog back to draft
# ==========================================

@router.patch(
    "/blogs/{blog_id}/status",
    response_model=BlogResponse,
)
def update_blog_status_admin(
    blog_id: int,
    status_data: BlogStatusUpdate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if blog is None:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    # 🚨 BLOCK: Admin cannot touch drafts
    if blog.status == "draft":
        raise HTTPException(
            status_code=403,
            detail=(
                "Draft blogs cannot be published or "
                "modified by admin. The author must "
                "submit the blog for review first."
            ),
        )

    # 🚨 BLOCK: Cannot move back to draft directly
    if status_data.status == "draft":
        raise HTTPException(
            status_code=400,
            detail=(
                "You cannot move a submitted blog "
                "directly back to draft. "
                "Use 'rejected' instead."
            ),
        )

    # VALIDATE
    if status_data.status not in (
        "pending",
        "published",
        "rejected",
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "Status must be 'pending', "
                "'published' or 'rejected'."
            ),
        )

    blog.status = status_data.status

    db.commit()
    db.refresh(blog)

    return blog


# ==========================================
# DELETE BLOG - ADMIN
# ==========================================

@router.delete(
    "/blogs/{blog_id}",
)
def delete_blog_admin(
    blog_id: int,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if blog is None:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    db.delete(blog)
    db.commit()

    return {
        "message": "Blog deleted successfully by admin",
        "blog_id": blog_id,
    }