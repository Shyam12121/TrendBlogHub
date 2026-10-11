import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import {
    FaArrowLeft,
    FaUser,
    FaCalendar,
    FaTag,
} from "react-icons/fa";

import { getPublicBlogs } from "../../services/adminApi";
import categories from "../../data/categories";

import "./BlogDetails.css";
import SEO from "../../components/SEO/SEO";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";

const BlogDetails = () => {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // LOAD BLOG
    // ==========================================

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPublicBlogs();

                const blogs = Array.isArray(data)
                    ? data
                    : data?.blogs || data?.items || [];

                const foundBlog = blogs.find(
                    (item) =>
                        item.slug === slug &&
                        (!item.status ||
                            item.status.toLowerCase() === "published")
                );

                if (!foundBlog) {
                    setError("Blog not found.");
                    return;
                }

                setBlog(foundBlog);
            } catch (err) {
                console.error("Blog details error:", err);

                setError(
                    err.response?.data?.detail ||
                        "Unable to load this blog."
                );
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [slug]);

    // ==========================================
    // DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "Recently";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Recently";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    // ==========================================
    // AUTHOR
    // ==========================================

    const getAuthorName = () => {
        return (
            blog?.author_name ||
            blog?.author?.name ||
            "IndiBlogHub Author"
        );
    };

    const getAuthorUsername = () => {
        return (
            blog?.author_username ||
            blog?.author?.username ||
            null
        );
    };

    // ==========================================
    // CATEGORY
    // ==========================================

    const getCategory = () => {
        if (!blog?.category) return null;
        return categories[blog.category] || null;
    };

    const category = getCategory();
    const authorName = getAuthorName();
    const authorUsername = getAuthorUsername();

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <main className="blog-details-page">
                <div className="blog-details-loading">
                    Loading article...
                </div>
            </main>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error || !blog) {
        return (
            <main className="blog-details-page">
                <div className="blog-not-found">
                    <h1>Blog Not Found</h1>

                    <p>
                        The article you're looking for doesn't
                        exist or is not published.
                    </p>

                    <Link to="/publications">
                        Browse Publications
                    </Link>
                </div>
            </main>
        );
    }

    // ==========================================
    // SANITIZE CONTENT
    // ==========================================

    const safeContent = DOMPurify.sanitize(blog.content || "", {
        ADD_ATTR: ["target", "rel"],
        ADD_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6"],
    });

    // ==========================================
    // PAGE
    // ==========================================

    return (
        <main className="blog-details-page">

            {blog && (
                <SEO
                    title={blog.meta_title || blog.title}
                    description={
                        blog.meta_description || blog.excerpt
                    }
                    keywords={blog.category}
                    url={`/${blog.slug}/`}
                    image={blog.featured_image}
                    type="article"
                    schema={{
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: blog.title,
                        description: blog.excerpt,
                        image: blog.featured_image,
                        author: {
                            "@type": "Person",
                            name: blog.author_name,
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "TrendBlogHub",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://trendbloghub.com/logo.png",
                            },
                        },
                        datePublished: blog.created_at,
                        dateModified: blog.updated_at,
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://trendbloghub.com/${blog.slug}/`,
                        },
                    }}
                />
            )}

            <article className="blog-details-container">

                {/* BACK */}

                <Link to="/publications" className="blog-back">
                    <FaArrowLeft />
                    Back to Publications
                </Link>

                {/* CATEGORY */}

                {category ? (
                    <Link
                        to={`/category/${category.slug}`}
                        className="blog-details-category"
                    >
                        <FaTag />
                        {category.name}
                    </Link>
                ) : (
                    <div className="blog-details-category">
                        <FaTag />
                        General
                    </div>
                )}

                {/* TITLE */}

                <h1 className="blog-details-title">
                    {blog.title}
                </h1>

                {/* EXCERPT */}

                {blog.excerpt && (
                    <p className="blog-details-excerpt">
                        {blog.excerpt}
                    </p>
                )}

                {/* META */}

                <div className="blog-details-meta">
                    {authorUsername ? (
                        <Link
                            to={`/profile/${encodeURIComponent(
                                authorUsername
                            )}`}
                            className="blog-author-link"
                            title={`View ${authorName}'s profile`}
                        >
                            <FaUser />
                            <span>{authorName}</span>
                        </Link>
                    ) : (
                        <span className="blog-author-link">
                            <FaUser />
                            <span>{authorName}</span>
                        </span>
                    )}

                    <span>
                        <FaCalendar />
                        {formatDate(blog.created_at)}
                    </span>
                </div>

                {/* IMAGE */}

                <div className="blog-details-image">
                    <img
                        src={
                            blog.featured_image || FALLBACK_IMAGE
                        }
                        alt={blog.title}
                        onError={(event) => {
                            event.currentTarget.src =
                                FALLBACK_IMAGE;
                        }}
                    />
                </div>

                {/* ==========================================
                    CONTENT — HTML properly rendered
                ========================================== */}

                <div
                    className="blog-details-content"
                    dangerouslySetInnerHTML={{
                        __html: safeContent,
                    }}
                />

            </article>

        </main>
    );
};

export default BlogDetails;