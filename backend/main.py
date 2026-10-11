import sys
import os

sys.path.insert(
    0,
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

load_dotenv(
    os.path.join(BASE_DIR, ".env"),
    override=True,
)


# ==========================================
# DATABASE
# ==========================================

from app.database.database import (
    Base,
    engine,
)


# ==========================================
# MODELS
# ==========================================

from app.models.user import User
from app.models.blog import Blog


# ==========================================
# ROUTES
# ==========================================

from app.routes.auth import (
    router as auth_router
)

from app.routes.admin import (
    router as admin_router
)

from app.routes.blog import (
    router as blog_router
)

from app.routes.profile import (
    router as profile_router
)
from app.routes.sitemap import router as sitemap_router

# ==========================================
# CREATE DATABASE TABLES
# ==========================================

Base.metadata.create_all(
    bind=engine
)


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="Blog API",
    version="1.0.0",
)


# ==========================================
# UPLOAD DIRECTORY
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads",
)


# ==========================================
# CREATE UPLOAD FOLDERS
# ==========================================

os.makedirs(
    os.path.join(
        UPLOAD_DIR,
        "avatars",
    ),
    exist_ok=True,
)

os.makedirs(
    os.path.join(
        UPLOAD_DIR,
        "covers",
    ),
    exist_ok=True,
)

os.makedirs(os.path.join(UPLOAD_DIR, "blogs"), exist_ok=True)  # ← ADD

# ==========================================
# SERVE UPLOADED FILES
# ==========================================

app.mount(
    "/uploads",
    StaticFiles(
        directory=UPLOAD_DIR
    ),
    name="uploads",
)


# ==========================================
# CORS - COMPLETE FIX
# ==========================================


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://trendbloghub.com",
        "https://www.trendbloghub.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# ROUTES
# ==========================================


# ------------------------------------------
# AUTH
# ------------------------------------------
# Auth router already has:
# prefix="/auth"
# ------------------------------------------

app.include_router(
    auth_router
)


# ------------------------------------------
# ADMIN
# ------------------------------------------
# Admin router already has:
# prefix="/admin"
# ------------------------------------------

app.include_router(
    admin_router
)


# ------------------------------------------
# BLOG
# ------------------------------------------
# Blog router already has its own prefix
# ------------------------------------------

app.include_router(
    blog_router
)


# ------------------------------------------
# USER PROFILE
# ------------------------------------------
# Profile router:
# prefix="/profile"
# ------------------------------------------

app.include_router(
    profile_router
)

app.include_router(sitemap_router)
# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():

    return {
        "message": "Blog API is running",
        "status": "success",
        "docs": "/docs",
    }


# ==========================================
# DATABASE TEST
# ==========================================

@app.get("/db-test")
def database_test():

    try:

        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT 1")
            )

            result.fetchone()

        return {
            "success": True,
            "message": "MySQL connected",
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e),
        }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "database": "connected",
    }