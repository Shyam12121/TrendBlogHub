from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    featured_image: str
    category: str
    meta_title: str
    meta_description: str
    status: str = "draft"


class BlogUpdate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    featured_image: str
    category: str
    meta_title: str
    meta_description: str
    status: str


class BlogStatusUpdate(BaseModel):
    status: str


class BlogResponse(BaseModel):
    id: int

    title: str

    slug: str

    content: str

    excerpt: str

    featured_image: str

    category: str

    meta_title: str

    meta_description: str

    status: str

    author_id: int

    author_name: str

    author_username: str

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
