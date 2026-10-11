import os
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Request,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.blog import Blog
from app.models.user import User

from app.schemas.blog import (
    BlogResponse,
)

from app.utils.security import (
    get_current_user,
)


router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"],
)


# ==========================================
# IMAGE CONFIG
# ==========================================

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

MAX_IMAGE_SIZE = 5 * 1024 * 1024


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

BLOG_UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads",
    "blogs",
)

os.makedirs(
    BLOG_UPLOAD_DIR,
    exist_ok=True,
)


# ==========================================
# SERIALIZE
# ==========================================

def serialize_blog(blog: Blog):
    return {
        "id": blog.id,
        "title": blog.title,
        "slug": blog.slug,
        "content": blog.content,
        "excerpt": blog.excerpt,
        "featured_image": blog.featured_image,
        "category": blog.category,
        "meta_title": blog.meta_title,
        "meta_description": blog.meta_description,
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
        "created_at": blog.created_at,
        "updated_at": blog.updated_at,
    }


# ==========================================
# SAVE IMAGE
# ==========================================

async def save_featured_image(
    image: UploadFile,
    request: Request,
):
    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPG, PNG and WebP "
                "images are allowed."
            ),
        )

    image_data = await image.read()

    if len(image_data) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=(
                "Featured image must be "
                "less than 5 MB."
            ),
        )

    extension = ALLOWED_IMAGE_TYPES[
        image.content_type
    ]

    filename = (
        f"{uuid4().hex}{extension}"
    )

    file_path = os.path.join(
        BLOG_UPLOAD_DIR,
        filename,
    )

    with open(
        file_path,
        "wb",
    ) as file:
        file.write(image_data)

    image_url = (
        f"{str(request.base_url).rstrip('/')}"
        f"/uploads/blogs/{filename}"
    )

    return image_url


# ==========================================
# CREATE BLOG
# USER + ADMIN
# ==========================================

@router.post(
    "",
    response_model=BlogResponse,
    status_code=201,
)
async def create_blog(
    request: Request,

    title: str = Form(...),

    slug: str = Form(...),

    content: str = Form(...),

    excerpt: str  = Form(None),

    category: str = Form(None),

    meta_title: str = Form(None),

    meta_description: str = Form(None),

    status: str = Form("draft"),

    featured_image: UploadFile = File(None),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db),
):

    if not title.strip():
        raise HTTPException(
            status_code=400,
            detail="Blog title is required.",
        )

    if not slug.strip():
        raise HTTPException(
            status_code=400,
            detail="Blog slug is required.",
        )

    if not content.strip():
        raise HTTPException(
            status_code=400,
            detail="Blog content is required.",
        )

    # User can only create as draft or pending
    if current_user.role != "admin":
        if status not in ("draft", "pending"):
            raise HTTPException(
                status_code=403,
                detail=(
                    "You can only create blogs as "
                    "'draft' or 'pending'. "
                    "Publishing is done by admin."
                ),
            )

    existing_blog = (
        db.query(Blog)
        .filter(Blog.slug == slug.strip())
        .first()
    )

    if existing_blog:
        raise HTTPException(
            status_code=400,
            detail=(
                "A blog with this slug "
                "already exists."
            ),
        )

    image_url = None

    if featured_image:
        image_url = (
            await save_featured_image(
                featured_image,
                request,
            )
        )

    new_blog = Blog(
        title=title.strip(),
        slug=slug.strip(),
        content=content,
        excerpt=(
            excerpt.strip()
            if excerpt
            else None
        ),
        featured_image=image_url,
        category=(
            category.strip()
            if category
            else None
        ),
        meta_title=(
            meta_title.strip()
            if meta_title
            else None
        ),
        meta_description=(
            meta_description.strip()
            if meta_description
            else None
        ),
        status=status,
        author_id=current_user.id,
    )

    db.add(new_blog)

    db.commit()

    db.refresh(new_blog)

    return serialize_blog(new_blog)


# ==========================================
# GET ALL PUBLIC BLOGS
# ==========================================

@router.get(
    "",
    response_model=list[BlogResponse],
)
def get_all_blogs(
    db: Session = Depends(get_db),
):
    blogs = (
        db.query(Blog)
        .filter(Blog.status == "published")
        .order_by(Blog.id.desc())
        .all()
    )

    return [
        serialize_blog(blog)
        for blog in blogs
    ]


# ==========================================
# GET MY BLOGS
# ==========================================

@router.get(
    "/my",
    response_model=list[BlogResponse],
)
def get_my_blogs(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):
    blogs = (
        db.query(Blog)
        .filter(
            Blog.author_id ==
            current_user.id
        )
        .order_by(Blog.id.desc())
        .all()
    )

    return [
        serialize_blog(blog)
        for blog in blogs
    ]


# ==========================================
# GET MY SINGLE BLOG (for edit form)
# ==========================================

@router.get(
    "/my/{blog_id}",
    response_model=BlogResponse,
)
def get_my_blog(
    blog_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(
            Blog.id == blog_id,
            Blog.author_id == current_user.id,
        )
        .first()
    )

    if blog is None:
        raise HTTPException(
            status_code=404,
            detail="Blog not found.",
        )

    return serialize_blog(blog)


# ==========================================
# GET SINGLE PUBLIC BLOG
# ==========================================

@router.get(
    "/{blog_id}",
    response_model=BlogResponse,
)
def get_blog(
    blog_id: int,
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

    return serialize_blog(blog)


# ==========================================
# UPDATE BLOG
# 🚨 USER: only DRAFT or REJECTED editable
# 🚨 ADMIN: any blog
# ==========================================

@router.patch(
    "/{blog_id}",
    response_model=BlogResponse,
)
async def update_blog(
    blog_id: int,

    request: Request,

    title: str = Form(...),

    slug: str = Form(...),

    content: str = Form(...),

    excerpt: str = Form(None),

    category: str = Form(None),

    meta_title: str = Form(None),

    meta_description: str = Form(None),

    status: str = Form("draft"),

    featured_image: UploadFile = File(None),

    current_user: User = Depends(
        get_current_user
    ),

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
            detail="Blog not found.",
        )

    is_admin = current_user.role == "admin"
    is_owner = blog.author_id == current_user.id

    if is_admin:
        pass

    elif is_owner:
        # ==========================================
        # 🚨 USER: only draft and rejected are editable
        # ==========================================
        if blog.status not in ("draft", "rejected"):
            raise HTTPException(
                status_code=403,
                detail=(
                    "Only draft and rejected blogs "
                    "can be edited. Submitted or "
                    "published blogs are locked. "
                    "Contact the administrator for changes."
                ),
            )

        # User cannot self-publish
        if status not in ("draft", "pending"):
            raise HTTPException(
                status_code=403,
                detail=(
                    "You cannot publish your own blog. "
                    "Submit it for review instead."
                ),
            )

    else:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to edit this blog.",
        )

    existing_blog = (
        db.query(Blog)
        .filter(
            Blog.slug == slug.strip(),
            Blog.id != blog_id,
        )
        .first()
    )

    if existing_blog:
        raise HTTPException(
            status_code=400,
            detail=(
                "A blog with this slug "
                "already exists."
            ),
        )

    if featured_image:
        image_url = (
            await save_featured_image(
                featured_image,
                request,
            )
        )

        blog.featured_image = image_url

    blog.title = title.strip()

    blog.slug = slug.strip()

    blog.content = content

    blog.excerpt = (
        excerpt.strip()
        if excerpt
        else None
    )

    blog.category = (
        category.strip()
        if category
        else None
    )

    blog.meta_title = (
        meta_title.strip()
        if meta_title
        else None
    )

    blog.meta_description = (
        meta_description.strip()
        if meta_description
        else None
    )

    blog.status = status

    db.commit()

    db.refresh(blog)

    return serialize_blog(blog)


# ==========================================
# DELETE BLOG
# ==========================================

@router.delete(
    "/{blog_id}"
)
def delete_blog(
    blog_id: int,

    current_user: User = Depends(
        get_current_user
    ),

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
            detail="Blog not found.",
        )

    is_admin = current_user.role == "admin"
    is_owner = blog.author_id == current_user.id

    if is_admin:
        pass

    elif is_owner:
        if blog.status == "published":
            raise HTTPException(
                status_code=403,
                detail=(
                    "Published blogs cannot be deleted "
                    "by the author. Contact admin."
                ),
            )

    else:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to delete this blog.",
        )

    db.delete(blog)

    db.commit()

    return {
        "message": "Blog deleted successfully.",
        "blog_id": blog_id,
    }
