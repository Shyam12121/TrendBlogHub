import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaArrowUp,
  FaTag,
  FaUser,
  FaClock,
  FaSearch,
} from "react-icons/fa";

import categories from "../../data/categories";
import { getPublicBlogs } from "../../services/adminApi";

import "./category.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";

const Category = () => {
  const { slug } = useParams();

  const category = categories[slug];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD BLOGS
  // ==========================================

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicBlogs();

        const allBlogs = Array.isArray(data)
          ? data
          : data?.blogs || data?.items || [];

        const publishedBlogs = allBlogs.filter(
          (blog) =>
            !blog.status ||
            String(blog.status).toLowerCase() === "published"
        );

        // Filter by category
       const categoryBlogs = publishedBlogs.filter((blog) => {
  const blogCategory =
    blog?.category ||
    blog?.category_name ||
    blog?.category?.name ||
    "";

  // Slug ya naam — dono se match karo
  const blogCat = String(blogCategory).toLowerCase().trim();
  const categorySlug = String(category?.slug).toLowerCase().trim();
  const categoryName = String(category?.name).toLowerCase().trim();

  return blogCat === categorySlug || blogCat === categoryName;
});

        setBlogs(categoryBlogs);
      } catch (err) {
        console.error("Category blogs error:", err);
        setError("Unable to load publications right now.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadBlogs();
    }
  }, [slug, category]);

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // AUTHOR NAME
  // ==========================================

  const getAuthorName = (post) => {
    return (
      post?.author_name ||
      post?.author?.name ||
      "TrendBlogHub Author"
    );
  };

  // ==========================================
  // AUTHOR USERNAME
  // ==========================================

  const getAuthorUsername = (post) => {
    return (
      post?.author_username ||
      post?.author?.username ||
      null
    );
  };

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!category) {
    return (
      <div className="category-not-found">
        <h1>Category Not Found</h1>

        <p>
          The category you are looking for does not exist.
        </p>

        <Link to="/categories">
          Browse All Categories
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <main className="category-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="category-hero">

        <div className="category-hero-overlay"></div>

        <div className="category-container">

          <div className="category-hero-content">

            <div className="category-icon">
              <Icon />
            </div>

            <h1>{category.name}</h1>

            <p>{category.description}</p>

            {/* Breadcrumb */}

            <div className="category-breadcrumb">

              <Link to="/">Home</Link>

              <FaChevronRight />

              <Link to="/categories">Categories</Link>

              <FaChevronRight />

              <span>{category.name}</span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <section className="category-content">

        <div className="category-container">

          <div className="category-intro">
            {category.intro}
          </div>


          {/* =========================
              LATEST CONTENT
          ========================= */}

          <section className="category-latest">

            <div className="section-heading">

              <div>
                <span className="section-label">
                  LATEST
                </span>

                <h2>
                  Latest {category.shortName} Content
                </h2>
              </div>

              <span className="category-count-badge">
                {blogs.length}{" "}
                {blogs.length === 1 ? "article" : "articles"}
              </span>

            </div>


            {/* LOADING */}

            {loading && (
              <div className="category-loading">
                Loading publications...
              </div>
            )}


            {/* ERROR */}

            {error && (
              <div className="category-error">
                <h3>Unable to Load Publications</h3>
                <p>{error}</p>
              </div>
            )}


            {/* EMPTY */}

            {!loading && !error && blogs.length === 0 && (
              <div className="empty-content">

                <div className="empty-icon">
                  <Icon />
                </div>

                <h3>
                  No {category.shortName} articles yet
                </h3>

                <p>
                  Fresh articles and publications in{" "}
                  {category.name} will appear here soon.
                </p>

                <Link
                  to="/publications"
                  className="empty-btn"
                >
                  Browse All Publications
                </Link>

              </div>
            )}


            {/* BLOG GRID */}

            {!loading && !error && blogs.length > 0 && (

              <div className="category-blogs-grid">

                {blogs.map((post) => {

                  const authorName =
                    getAuthorName(post);

                  const authorUsername =
                    getAuthorUsername(post);

                  return (
                    <article
                      className="category-blog-card"
                      key={post.id}
                    >

                      {/* IMAGE */}

                      <Link
                        to={`/blog/${post.slug}`}
                        className="category-blog-image-link"
                      >

                        <div className="category-blog-image">

                          <img
                            src={
                              post.featured_image ||
                              FALLBACK_IMAGE
                            }
                            alt={
                              post.title ||
                              `${category.name} article`
                            }
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                FALLBACK_IMAGE;
                            }}
                          />

                          <div className="category-blog-badge">
                            <FaTag />
                            {category.shortName}
                          </div>

                        </div>

                      </Link>

                      {/* CONTENT */}

                      <div className="category-blog-content">

                        <Link
                          to={`/blog/${post.slug}`}
                          className="category-blog-title-link"
                        >
                          <h3>{post.title}</h3>
                        </Link>

                        {post.excerpt && (
                          <p>{post.excerpt}</p>
                        )}

                        {/* META */}

                        <div className="category-blog-meta">

                          <span>
                            <FaClock />
                            {formatDate(
                              post.created_at ||
                                post.published_at
                            )}
                          </span>

                          <i></i>

                          {authorUsername ? (
                            <Link
                              to={`/profile/${encodeURIComponent(
                                authorUsername
                              )}`}
                              className="category-blog-author"
                            >
                              <FaUser />
                              <span>{authorName}</span>
                            </Link>
                          ) : (
                            <span className="category-blog-author">
                              <FaUser />
                              <span>{authorName}</span>
                            </span>
                          )}

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

          </section>

        </div>

      </section>


      {/* =========================
          SCROLL TOP
      ========================= */}

      <button
        className="category-scroll-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>

    </main>
  );
};

export default Category;