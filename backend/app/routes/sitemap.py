from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from datetime import datetime

from app.database.database import get_db
from app.models.blog import Blog

router = APIRouter(tags=["Sitemap"])

SITE_URL = "https://trendbloghub.com"


@router.get("/sitemap.xml")
def sitemap(db: Session = Depends(get_db)):
    blogs = (
        db.query(Blog)
        .filter(Blog.status == "published")
        .all()
    )

    urls = []

    static_pages = [
        ("/", "daily", "1.0"),
        ("/about-us/", "monthly", "0.7"),
        ("/publications/", "daily", "0.9"),
        ("/write-for-us/", "monthly", "0.6"),
        ("/content-policy/", "yearly", "0.3"),
        ("/contact-us/", "yearly", "0.5"),
        ("/privacy-policy/", "yearly", "0.2"),
        ("/disclaimer/", "yearly", "0.2"),
    ]

    for path, freq, priority in static_pages:
        urls.append(
            f"""
    <url>
        <loc>{SITE_URL}{path}</loc>
        <changefreq>{freq}</changefreq>
        <priority>{priority}</priority>
    </url>"""
        )

    for blog in blogs:
        lastmod = (
            blog.updated_at.strftime("%Y-%m-%d")
            if blog.updated_at
            else datetime.now().strftime("%Y-%m-%d")
        )
        urls.append(
            f"""
    <url>
        <loc>{SITE_URL}/{blog.slug}/</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>"""
        )

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{''.join(urls)}
</urlset>"""

    return Response(content=xml, media_type="application/xml")