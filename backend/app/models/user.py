from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    # ==========================================
    # BASIC
    # ==========================================

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # ==========================================
    # PROFILE
    # ==========================================

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    username: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=True,
    )

    country: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    website: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    bio: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    avatar: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    cover_image: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    # ==========================================
    # ACCOUNT
    # ==========================================

    role: Mapped[str] = mapped_column(
        String(20),
        default="user",
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    # ==========================================
    # TIMESTAMPS
    # ==========================================

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
