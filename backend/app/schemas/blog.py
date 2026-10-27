from datetime import datetime
from typing import Optional

from pydantic import (
    BaseModel,
    ConfigDict,
)


class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    status: str = "draft"


class BlogUpdate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    status: str


class BlogStatusUpdate(BaseModel):
    status: str


class BlogResponse(BaseModel):
    id: int

    title: str

    slug: str

    content: str

    excerpt: Optional[str] = None

    featured_image: Optional[str] = None

    category: Optional[str] = None

    meta_title: Optional[str] = None

    meta_description: Optional[str] = None

    status: str

    author_id: int

    author_name: Optional[str] = None

    author_username: Optional[str] = None

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )