import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  FaSearch,
  FaArrowRight,
  FaFileAlt,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

import "./Search.css";
const API_URL = import.meta.env.VITE_API_URL;
// ==========================================
// API URL
// ==========================================

// const API_URL =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1"
//     ? "http://127.0.0.1:8000"
//     : "http://192.168.29.233:8000";

// ==========================================
// SEARCH PAGE
// ==========================================

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH BLOGS
  // ==========================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/blogs`);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.blogs || response.data?.items || [];

        setBlogs(data);
      } catch (err) {
        console.error("Search blogs error:", err);

        setError(
          "Unable to load blogs right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ==========================================
  // KEEP SEARCH INPUT IN SYNC WITH URL
  // ==========================================

  useEffect(() => {
    const query = searchParams.get("q") || "";

    setInputValue(query);
    setSearchQuery(query);
  }, [searchParams]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = inputValue.trim();

    if (!query) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      q: query,
    });
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const clearSearch = () => {
    setInputValue("");
    setSearchParams({});
  };

  // ==========================================
  // FILTER BLOGS
  // ==========================================

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return blogs.filter((blog) => {
      const title = String(blog.title || "").toLowerCase();

      const excerpt = String(blog.excerpt || "").toLowerCase();

      const content = String(blog.content || "").toLowerCase();

      const category = String(blog.category || "").toLowerCase();

      const slug = String(blog.slug || "").toLowerCase();

      const author =
        typeof blog.author === "object"
          ? String(blog.author?.name || "").toLowerCase()
          : String(blog.author || "").toLowerCase();

      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        content.includes(query) ||
        category.includes(query) ||
        slug.includes(query) ||
        author.includes(query)
      );
    });
  }, [blogs, searchQuery]);

  // ==========================================
  // HELPERS
  // ==========================================

  const getBlogImage = (blog) => {
    return (
      blog.featured_image ||
      blog.featuredImage ||
      blog.image ||
      ""
    );
  };

  const getAuthorName = (blog) => {
    if (typeof blog.author === "object") {
      return blog.author?.name || "IndiBlogHub Author";
    }

    return blog.author || "IndiBlogHub Author";
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="search-page">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="search-hero">

        <div className="container">

          <div className="search-hero-content">

            <span className="search-eyebrow">
              <FaSearch />
              DISCOVER CONTENT
            </span>

            <h1>
              Search <span>IndiBlogHub</span>
            </h1>

            <p>
              Find articles, ideas and stories from across
              IndiBlogHub.
            </p>

            {/* Search Form */}

            <form
              className="search-form"
              onSubmit={handleSearch}
            >

              <div className="search-input-wrapper">

                <FaSearch className="search-input-icon" />

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search blogs, topics, categories..."
                  aria-label="Search blogs"
                />

                {inputValue && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}

              </div>

              <button
                type="submit"
                className="search-submit"
              >
                Search
                <FaArrowRight />
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ========================================
          RESULTS
      ======================================== */}

      <section className="search-results">

        <div className="container">

          {/* Loading */}

          {loading && (
            <div className="search-state">

              <FaSpinner className="search-spinner" />

              <h3>Loading blogs...</h3>

              <p>
                Finding the latest content for you.
              </p>

            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="search-state search-error">

              <FaFileAlt />

              <h3>Something went wrong</h3>

              <p>{error}</p>

            </div>
          )}

          {/* No Search Yet */}

          {!loading &&
            !error &&
            !searchQuery && (
              <div className="search-state">

                <FaSearch />

                <h3>Start searching</h3>

                <p>
                  Enter a keyword above to discover blogs.
                </p>

              </div>
            )}

          {/* Search Results */}

          {!loading &&
            !error &&
            searchQuery && (
              <>
                <div className="results-heading">

                  <div>
                    <span>SEARCH RESULTS</span>

                    <h2>
                      Results for{" "}
                      <strong>"{searchQuery}"</strong>
                    </h2>
                  </div>

                  <div className="results-count">
                    {filteredBlogs.length}{" "}
                    {filteredBlogs.length === 1
                      ? "result"
                      : "results"}
                  </div>

                </div>

                {/* No Results */}

                {filteredBlogs.length === 0 && (
                  <div className="search-state no-results">

                    <FaSearch />

                    <h3>
                      No blogs found
                    </h3>

                    <p>
                      We couldn't find anything matching{" "}
                      <strong>"{searchQuery}"</strong>.
                    </p>

                    <button
                      type="button"
                      onClick={clearSearch}
                      className="try-again-btn"
                    >
                      Try another search
                    </button>

                  </div>
                )}

                {/* Results Grid */}

                {filteredBlogs.length > 0 && (
                  <div className="search-grid">

                    {filteredBlogs.map((blog) => {

                      const image =
                        getBlogImage(blog);

                      return (
                        <article
                          className="search-card"
                          key={blog.id}
                        >

                          {/* Image */}

                          <div className="search-card-image">

                            {image ? (
                              <img
                                src={image}
                                alt={blog.title || "Blog"}
                              />
                            ) : (
                              <div className="search-card-placeholder">
                                <FaFileAlt />
                              </div>
                            )}

                            {blog.category && (
                              <span className="search-category">
                                {blog.category}
                              </span>
                            )}

                          </div>

                          {/* Content */}

                          <div className="search-card-content">

                            <h3>
                              {blog.title}
                            </h3>

                            <p>
                              {blog.excerpt ||
                                String(
                                  blog.content || ""
                                ).slice(0, 150) +
                                  "..."}
                            </p>

                            <div className="search-card-footer">

                              <span>
                                By{" "}
                                {getAuthorName(blog)}
                              </span>

                              <Link
                                to={`/blog/${
                                  blog.slug || blog.id
                                }`}
                                className="read-more"
                              >
                                Read
                                <FaArrowRight />
                              </Link>

                            </div>

                          </div>

                        </article>
                      );
                    })}

                  </div>
                )}

              </>
            )}

        </div>

      </section>

    </main>
  );
};

export default Search;