import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronRight,
  FaClock,
  FaSearch,
  FaTag,
  FaUser,
} from "react-icons/fa";

import { getPublicBlogs } from "../../services/adminApi";
import SEO from "../../components/SEO/SEO";

import "./Publications.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";

const CATEGORIES = [
  { name: "Technology & AI", slug: "technology-ai" },
  { name: "Digital Marketing", slug: "digital-marketing" },
  { name: "Health & Wellness", slug: "health-wellness" },
  { name: "Travel & Lifestyle", slug: "travel-lifestyle" },
  { name: "Education & Career", slug: "education-career" },
  { name: "Business & Finance", slug: "business-finance" },
  { name: "Programming & Dev", slug: "programming-dev" },
];

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicBlogs();

        const blogs = Array.isArray(data)
          ? data
          : data?.blogs || data?.items || [];

        const publishedBlogs = blogs.filter(
          (blog) =>
            !blog.status ||
            String(blog.status).toLowerCase() === "published"
        );

        setPublications(publishedBlogs);
      } catch (err) {
        console.error("Public blogs error:", err);
        setError("Unable to load publications right now.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Recently";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Recently";
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getAuthorName = (post) =>
    post?.author_name || post?.author?.name || "TrendBlogHub Author";

  const getAuthorUsername = (post) =>
    post?.author_username || post?.author?.username || null;

  const isAdminAuthor = (post) => {
    const role =
      post?.author_role || post?.author?.role || post?.role || "";
    return String(role).toLowerCase() === "admin";
  };

  const getCategory = (post) =>
    post?.category ||
    post?.category_name ||
    post?.category?.name ||
    "General";

  const getCategorySlug = (category) => {
    const matchedCategory = CATEGORIES.find(
      (item) => item.name.toLowerCase() === String(category).toLowerCase()
    );
    if (matchedCategory) return matchedCategory.slug;
    return String(category)
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const authors = useMemo(() => {
    const uniqueAuthors = new Map();
    publications.forEach((post) => {
      const username = getAuthorUsername(post);
      const name = getAuthorName(post);
      const key = username || name;
      if (key && !uniqueAuthors.has(key)) {
        uniqueAuthors.set(key, { key, name, username });
      }
    });
    return Array.from(uniqueAuthors.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [publications]);

  const filteredPublications = useMemo(() => {
    let result = [...publications];
    const search = searchTerm.trim().toLowerCase();

    if (search) {
      result = result.filter((post) => {
        const title = post?.title?.toLowerCase() || "";
        const excerpt = post?.excerpt?.toLowerCase() || "";
        const content = post?.content?.toLowerCase() || "";
        const category = String(getCategory(post)).toLowerCase();
        const author = getAuthorName(post).toLowerCase();
        return (
          title.includes(search) ||
          excerpt.includes(search) ||
          content.includes(search) ||
          category.includes(search) ||
          author.includes(search)
        );
      });
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (post) => getCategorySlug(getCategory(post)) === categoryFilter
      );
    }

    if (authorFilter !== "all") {
      result = result.filter((post) => {
        const username = getAuthorUsername(post);
        const name = getAuthorName(post);
        return username === authorFilter || name === authorFilter;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b?.created_at || 0) - new Date(a?.created_at || 0);
      if (sortBy === "popular")
        return (
          Number(b?.views || b?.view_count || 0) -
          Number(a?.views || a?.view_count || 0)
        );
      if (sortBy === "category")
        return getCategory(a).localeCompare(getCategory(b));
      if (sortBy === "contributor")
        return getAuthorName(a).localeCompare(getAuthorName(b));
      return 0;
    });

    return result;
  }, [publications, searchTerm, sortBy, categoryFilter, authorFilter]);

  const canonicalUrl = `${window.location.origin}/publications/`;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${window.location.origin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Publications",
        item: canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    "@type": "ItemList",
    name: "TrendBlogHub Latest Publications",
    description:
      "Latest approved publications from TrendBlogHub contributors.",
    itemListElement: filteredPublications.slice(0, 20).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post?.title || "TrendBlogHub Publication",
      url: `${window.location.origin}/blog/${post?.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title="Publications – Latest Articles & Insights"
        description="Browse the latest TrendBlogHub publications across technology, health, business, finance, education, lifestyle, entertainment and more."
        keywords="TrendBlogHub publications, latest articles, blog publications, technology articles, health articles, business articles, finance articles, education articles, lifestyle articles, entertainment articles"
        url="/publications/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, itemListSchema],
        }}
      />

      <main className="publications-page">
        {/* ==========================================
            HERO
        ========================================== */}

        <section className="directory-hero">
          <div className="directory-hero-content">
            <span className="directory-badge">TREND BLOG HUB</span>

            <h1>Explore the Latest Articles</h1>

            <p>
              Welcome to the TrendBlogHub Publications section, where you’ll
              find articles published across our different categories and
              topics. Browse the latest publications, explore a category,
              search for a subject, or discover articles from different
              contributors. Our goal is to make it easy to find something
              useful, interesting, or worth exploring.
            </p>

            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <FaChevronRight />
              <span>Publications</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            SEARCH + SORT
        ========================================== */}

        <section className="publication-tools-section">
          <div className="publications-container">
            <div className="publication-tools">
              <div className="publication-search">
                <FaSearch />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a topic, idea, or keyword"
                  aria-label="Search publications"
                />
              </div>

              <div className="publication-filters">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort publications"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="category">By Category</option>
                  <option value="contributor">By Contributor</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  aria-label="Filter by contributor"
                >
                  <option value="all">All Contributors</option>
                  {authors.map((author) => (
                    <option
                      key={author.key}
                      value={author.username || author.name}
                    >
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            EXPLORE CATEGORIES
        ========================================== */}

        <section className="categories-section">
          <div className="publications-container">
            <div className="section-heading">
              <span>EXPLORE</span>
              <h2>Explore Categories</h2>
              <p>Browse publications by subject:</p>
            </div>

            <div className="categories-list">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="category-link"
                >
                  {category.name}
                  <FaArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            LATEST PUBLICATIONS
        ========================================== */}

        <section className="publications-section">
          <div className="publications-container">
            <div className="publications-header">
              <div>
                <span className="section-label">LATEST PUBLICATIONS</span>
                <h2>Latest Publications</h2>
                <p>
                  Discover what’s being published across TrendBlogHub. This
                  section automatically displays the latest approved
                  publications from our contributor community, including
                  information about each article’s category, contributor,
                  publication date, and other relevant details.
                </p>
              </div>

              <span className="publication-count">
                {filteredPublications.length}{" "}
                {filteredPublications.length === 1 ? "article" : "articles"}
              </span>
            </div>

            {loading && (
              <div className="publications-loading">
                Loading latest publications...
              </div>
            )}

            {error && (
              <div className="publications-error">
                <h3>Unable to Load Publications</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredPublications.length === 0 && (
              <div className="publications-empty">
                <div className="empty-icon">
                  <FaSearch />
                </div>
                <h3>No Publications Found</h3>
                <p>
                  We couldn’t find anything matching your search. Try another
                  keyword, or browse our categories to discover more articles.
                </p>
                <Link to="/categories" className="empty-btn">
                  Browse All Categories
                  <FaArrowRight />
                </Link>
              </div>
            )}

            {!loading && !error && filteredPublications.length > 0 && (
              <div className="publications-grid">
                {filteredPublications.map((post) => {
                  const authorName = getAuthorName(post);
                  const authorUsername = getAuthorUsername(post);
                  const adminAuthor = isAdminAuthor(post);
                  const category = getCategory(post);

                  return (
                    <article className="publication-card" key={post.id}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="publication-image-link"
                        aria-label={`Read ${post.title}`}
                      >
                        <div className="publication-image">
                          <img
                            src={post.featured_image || FALLBACK_IMAGE}
                            alt={post.title || "TrendBlogHub publication"}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                          <div className="category-badge">
                            <FaTag />
                            {category}
                          </div>
                        </div>
                      </Link>

                      <div className="publication-content">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="publication-title-link"
                        >
                          <h3>{post.title}</h3>
                        </Link>

                        {post.excerpt && <p>{post.excerpt}</p>}

                        <div className="publication-meta">
                          <span>
                            <FaClock />
                            {formatDate(post.created_at || post.published_at)}
                          </span>
                          <i></i>
                          {adminAuthor ? (
                            <span
                              className="publication-author"
                              title="Admin"
                            >
                              <FaUser />
                              <span>{authorName}</span>
                            </span>
                          ) : authorUsername ? (
                            <Link
                              to={`/profile/${encodeURIComponent(
                                authorUsername
                              )}`}
                              className="publication-author"
                              title={`View ${authorName}'s profile`}
                            >
                              <FaUser />
                              <span>{authorName}</span>
                            </Link>
                          ) : (
                            <span className="publication-author">
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
          </div>
        </section>

        {/* ==========================================
            PUBLISH CTA
        ========================================== */}

        <section className="publish-section">
          <div className="publications-container">
            <div className="publish-card">
              <span className="publish-label">FOR CONTRIBUTORS</span>
              <h2>Want to Publish on TrendBlogHub?</h2>
              <p>
                If you have useful knowledge, an experience worth sharing, or
                an interesting perspective, you can submit your work for
                consideration.
              </p>
              <Link to="/login" className="publish-button">
                Start Publishing
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Publications;