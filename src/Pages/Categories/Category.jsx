import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaArrowUp,
  FaTag,
  FaUser,
  FaClock,
} from "react-icons/fa";

import categories from "../../data/categories";
import { getPublicBlogs } from "../../services/adminApi";
import SEO from "../../components/SEO/SEO";

// 👇 Naye naam ke saath imports (Space ki jagah hyphen)
import techBg from "../../assets/Technology-&-AI-background-image-of-TrendBlogHub.webp";
import marketingBg from "../../assets/Digital-Marketing-images-background-of-TrendBloghub.webp";
import healthBg from "../../assets/Health-&-Wellness-images-background-of-TrendBlogHub.webp";
import educationBg from "../../assets/Education-&-Career-images-background-of-TrendBlogHub.webp";
import programmingBg from "../../assets/Programming-&-Dev-image-of-TrendBlogHub.webp";
import financeBg from "../../assets/Business-&-Finance-images-background-of-TrendBlogHub.webp";
import travelBg from "../../assets/Travel-&-Lifestyle-image-of-TrendBlogHub.webp";

import "./category.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";

// SEO mapping
const bgImages = {
  "technology-ai": techBg,
  "digital-marketing": marketingBg,
  "health-wellness": healthBg,
  "travel-lifestyle": travelBg,
  "education-career": educationBg,
  "business-finance": financeBg,
  "programming-dev": programmingBg,
};

const Category = () => {
  const { slug } = useParams();
  const category = categories[slug];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPublicBlogs();
        const allBlogs = Array.isArray(data) ? data : data?.blogs || data?.items || [];
        const publishedBlogs = allBlogs.filter(
          (blog) => !blog.status || String(blog.status).toLowerCase() === "published"
        );

        const categoryBlogs = publishedBlogs.filter((blog) => {
          const blogCategory = blog?.category || blog?.category_name || blog?.category?.name || "";
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

    if (category) loadBlogs();
  }, [slug, category]);

  const formatDate = (date) => {
    if (!date) return "Recently";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Recently";
    return parsedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getAuthorName = (post) => post?.author_name || post?.author?.name || "TrendBlogHub Author";
  const getAuthorUsername = (post) => post?.author_username || post?.author?.username || null;

  if (!category) {
    return (
      <div className="category-not-found">
        <h1>Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
        <Link to="/categories">Browse All Categories</Link>
      </div>
    );
  }

  const Icon = category.icon;
  const heroStyle = category.bgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${category.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <main className="category-page">
      
      <SEO
        title={`${category.name} Articles`}
        description={category.description}
        url={`/category/${slug}`}
        image={bgImages[slug]} // 👈 No %20 issue
        keywords={`${category.name}, ${category.shortName}, articles, blog, TrendBlogHub`}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.name} - TrendBlogHub`,
          description: category.description,
          url: `https://www.trendbloghub.com/category/${slug}`,
        }}
      />

      <section className="category-hero" style={heroStyle}>
        <div className="category-hero-overlay" style={{ display: "none" }}></div>
        
        <div className="category-container">
          <div className="category-hero-content">
            <div className="category-icon">
              <Icon />
            </div>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
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

      <section className="category-content">
        <div className="category-container">
          <div className="category-intro">{category.intro}</div>

          <section className="category-latest">
            <div className="section-heading">
              <div>
                <span className="section-label">LATEST</span>
                <h2>Latest {category.shortName} Content</h2>
              </div>
              <span className="category-count-badge">
                {blogs.length} {blogs.length === 1 ? "article" : "articles"}
              </span>
            </div>

            {loading && <div className="category-loading">Loading publications...</div>}

            {error && (
              <div className="category-error">
                <h3>Unable to Load Publications</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && blogs.length === 0 && (
              <div className="empty-content">
                <div className="empty-icon">
                  <Icon />
                </div>
                <h3>No {category.shortName} articles yet</h3>
                <p>Fresh articles and publications in {category.name} will appear here soon.</p>
                <Link to="/publications" className="empty-btn">Browse All Publications</Link>
              </div>
            )}

            {!loading && !error && blogs.length > 0 && (
              <div className="category-blogs-grid">
                {blogs.map((post) => {
                  const authorName = getAuthorName(post);
                  const authorUsername = getAuthorUsername(post);

                  return (
                    <article className="category-blog-card" key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="category-blog-image-link">
                        <div className="category-blog-image">
                          <img
                            src={post.featured_image || FALLBACK_IMAGE}
                            alt={post.title || `${category.name} article`}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                          />
                          <div className="category-blog-badge">
                            <FaTag />
                            {category.shortName}
                          </div>
                        </div>
                      </Link>

                      <div className="category-blog-content">
                        <Link to={`/blog/${post.slug}`} className="category-blog-title-link">
                          <h3>{post.title}</h3>
                        </Link>
                        {post.excerpt && <p>{post.excerpt}</p>}
                        <div className="category-blog-meta">
                          <span>
                            <FaClock />
                            {formatDate(post.created_at || post.published_at)}
                          </span>
                          <i></i>
                          {authorUsername ? (
                            <Link
                              to={`/profile/${encodeURIComponent(authorUsername)}`}
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

      <button
        className="category-scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </main>
  );
};

export default Category;