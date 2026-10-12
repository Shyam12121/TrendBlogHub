
import os
from getpass import getpass

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.user import User
from app.utils.security import hash_password


DATABASE_URL = "postgresql://postgres.mmypbeikwdxudcztiwww:TrendBlog#74@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL .env mein nahi mila")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def create_admin():
    db = SessionLocal()

    try:
        name = "Shyam"
        email = "admin@trendbloghub.com"
        password = "admin@shyam199"
        confirm = "admin@shyam199"

        if not name or not email or not password:
            print("Name, email and password are required.")
            return

        if password != confirm:
            print("Passwords do not match.")
            return

        existing = db.query(User).filter(
            User.email == email
        ).first()

        if existing:
            print("This email is already registered.")
            return

        admin = User(
            name=name,
            email=email,
            password=hash_password(password),
            role="admin",
            is_active=True,
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        print("\nAdmin created successfully!")
        print("ID:", admin.id)
        print("Email:", admin.email)
        print("Role:", admin.role)

    except Exception as exc:
        db.rollback()
        print("Admin creation failed:", exc)

    finally:
        db.close()
        engine.dispose()


if __name__ == "__main__":
    create_admin()
