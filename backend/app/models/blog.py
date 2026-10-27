from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.database import Base


class Blog(Base):
    __tablename__ = "blogs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    excerpt: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    featured_image: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    meta_title: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    meta_description: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="draft",
        nullable=False,
    )

    author_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    author = relationship(
        "User",
        backref="blogs",
        lazy="joined",          # ✅ ADDED — author hamesha eager-load hoga
    )