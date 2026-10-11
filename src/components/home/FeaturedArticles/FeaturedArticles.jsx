import "./FeaturedArticles.css";

import {
  FaCalendar,
  FaClock,
  FaArrowRight,
  FaNewspaper,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const FeaturedArticles = ({ articles, loading }) => {
  const safeArticles = Array.isArray(articles)
    ? articles
    : [];

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="featured-articles">
        <div className="container">
          <div className="empty-articles">
            <p>Loading latest publications...</p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (!safeArticles.length) {
    return (
      <section className="featured-articles">
        <div className="container">
          <div className="empty-articles">
            <FaNewspaper className="empty-icon" />
            <p>No publications available right now.</p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // SPLIT
  // ==========================================

  const featuredArticle =
    safeArticles.find((a) => a.featured) ||
    safeArticles[0];

  const otherArticles = safeArticles
    .filter((a) => a.id !== featuredArticle?.id)
    .slice(0, 3);

  return (
    <section className="featured-articles">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">
          <div className="header-left">
            <span className="section-badge">
              📰 LATEST PUBLICATIONS
            </span>

            <h2>
              Latest Publications — Fresh Ideas,
              New Perspectives
            </h2>

            <p>
              Browse the latest articles published
              on TrendBlogHub across different
              categories and areas of interest.
            </p>
          </div>

          <Link
            to="/publications"
            className="view-all-btn"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        {/* FEATURED ARTICLE */}
        {featuredArticle && (
          <Link
            to={`/blog/${
              featuredArticle.slug || featuredArticle.id
            }`}
            className="featured-main"
          >
            <div className="featured-main-image">
              {featuredArticle.image ? (
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="no-image-placeholder">
                  <FaNewspaper />
                </div>
              )}

              <div className="featured-overlay">
                <span className="featured-tag">
                  ⭐ Featured
                </span>
              </div>
            </div>

            <div className="featured-main-content">
              <span
                className="article-category"
                style={{
                  background:
                    featuredArticle.categoryColor ||
                    "#2563eb",
                }}
              >
                {featuredArticle.category}
              </span>

              <h2>{featuredArticle.title}</h2>

              <p>{featuredArticle.excerpt}</p>

              <div className="article-meta">
                <div className="author-info">
                  {featuredArticle.author?.avatar && (
                    <img
                      src={featuredArticle.author.avatar}
                      alt={
                        featuredArticle.author?.name ||
                        "Author"
                      }
                      loading="lazy"
                    />
                  )}

                  <div>
                    <span className="author-name">
                      {featuredArticle.author?.name ||
                        "Contributor"}
                    </span>

                    <span className="author-role">
                      {featuredArticle.author?.role ||
                        "Contributor"}
                    </span>
                  </div>
                </div>

                <div className="meta-details">
                  {featuredArticle.date && (
                    <span>
                      <FaCalendar />
                      {featuredArticle.date}
                    </span>
                  )}

                  {featuredArticle.readTime && (
                    <span>
                      <FaClock />
                      {featuredArticle.readTime}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        {otherArticles.length > 0 && (
          <div className="featured-grid">
            {otherArticles.map((article) => (
              <Link
                to={`/blog/${article.slug || article.id}`}
                className="featured-card"
                key={article.id}
              >
                <div className="card-image">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <FaNewspaper />
                    </div>
                  )}

                  <span
                    className="card-category"
                    style={{
                      background:
                        article.categoryColor ||
                        "#2563eb",
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                <div className="card-content">
                  <h3>{article.title}</h3>

                  <p>{article.excerpt}</p>

                  <div className="card-meta">
                    <div className="card-author">
                      {article.author?.avatar && (
                        <img
                          src={article.author.avatar}
                          alt={
                            article.author?.name ||
                            "Author"
                          }
                          loading="lazy"
                        />
                      )}

                      <span>
                        {article.author?.name ||
                          "Contributor"}
                      </span>
                    </div>

                    <div className="card-stats">
                      {article.date && (
                        <span>
                          <FaCalendar />
                          {article.date}
                        </span>
                      )}

                      {article.readTime && (
                        <span>
                          <FaClock />
                          {article.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="publications-description">
          <p>
            Our publication feed brings together
            new articles across different
            categories, allowing readers to
            discover useful information and
            perspectives from contributors with
            different areas of knowledge and
            experience.
          </p>

          <Link
            to="/publications"
            className="publications-link"
          >
            View All Publications
            <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedArticles;