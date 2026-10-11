import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaMapMarkerAlt,
  FaGlobe,
  FaBookOpen,
  FaCalendar,
  FaTag,
} from "react-icons/fa";

import {
  getPublicProfile,
  getPublicBlogs,
} from "../../services/adminApi";

import categories from "../../data/categories";

import "./PublicProfile.css";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=Author&background=2563eb&color=fff&size=200";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80";

const FALLBACK_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80";

const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD PROFILE + BLOGS
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileData, blogsData] = await Promise.all([
          getPublicProfile(username),
          getPublicBlogs(),
        ]);

        // ==========================================
        // ADMIN PROFILE PROTECTION
        // ==========================================

        const profileRole = String(
          profileData?.role || ""
        )
          .trim()
          .toLowerCase();

        if (profileRole === "admin") {
          navigate("/profile", { replace: true });
          return;
        }

        setProfile(profileData);

        // ==========================================
        // BLOGS
        // ==========================================

        const allBlogs = Array.isArray(blogsData)
          ? blogsData
          : blogsData?.blogs ||
            blogsData?.items ||
            [];

        const requestedUsername = String(username || "")
          .trim()
          .toLowerCase();

        const publishedBlogs = allBlogs.filter((blog) => {
          const blogUsername = String(
            blog?.author_username || ""
          )
            .trim()
            .toLowerCase();

          const isPublished =
            !blog?.status ||
            String(blog.status).toLowerCase() === "published";

          return (
            blogUsername === requestedUsername &&
            isPublished
          );
        });

        setBlogs(publishedBlogs);
      } catch (err) {
        console.error("Public profile error:", err);

        if (err?.response?.status === 404) {
          setError("User profile not found.");
        } else {
          setError(
            err?.response?.data?.detail ||
              "Unable to load profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfile();
    }
  }, [username, navigate]);

  // ==========================================
  // DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

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
  // DISPLAY NAME
  // ==========================================

  const getDisplayName = () => {
    if (!profile) {
      return "Author";
    }

    const fullName = [
      profile.first_name,
      profile.last_name,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      fullName ||
      profile.name ||
      profile.username ||
      "Author"
    );
  };

  // ==========================================
  // CATEGORY
  // ==========================================

  const getCategory = (categorySlug) => {
    if (!categorySlug) {
      return null;
    }

    return categories[categorySlug] || null;
  };

  // ==========================================
  // AVATAR
  // ==========================================

  const getAvatar = () => {
    const name = getDisplayName();

    if (profile?.avatar) {
      return profile.avatar;
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=2563eb&color=fff&size=200`;
  };

  // ==========================================
  // COVER
  // ==========================================

  const getCover = () => {
    if (profile?.cover_image) {
      return profile.cover_image;
    }

    return FALLBACK_COVER;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="public-profile-page">
        <div className="public-profile-loading">
          <div className="public-profile-spinner"></div>

          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !profile) {
    return (
      <main className="public-profile-page">
        <div className="public-profile-error">
          <FaUser />

          <h1>
            {error || "Profile not found"}
          </h1>

          <Link
            to="/profile"
            className="public-profile-back"
          >
            <FaArrowLeft />
            Back to Authors
          </Link>
        </div>
      </main>
    );
  }

  const displayName = getDisplayName();

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <main className="public-profile-page">

      {/* ==========================================
          COVER
      ========================================== */}

      <section className="public-profile-cover">
        <img
          src={getCover()}
          alt={`${displayName} cover`}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_COVER;
          }}
        />

        <div className="public-profile-cover-overlay"></div>
      </section>

      {/* ==========================================
          PROFILE CONTAINER
      ========================================== */}

      <section className="public-profile-container">

        {/* BACK */}

        <Link
          to="/profile"
          className="public-profile-back"
        >
          <FaArrowLeft />
          Back to Authors
        </Link>

        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="public-profile-card">

          {/* AVATAR */}

          <div className="public-profile-avatar">
            <img
              src={getAvatar()}
              alt={displayName}
              onError={(event) => {
                event.currentTarget.onerror = null;

                const fallbackName =
                  encodeURIComponent(displayName);

                event.currentTarget.src =
                  `https://ui-avatars.com/api/?name=${fallbackName}&background=2563eb&color=fff&size=200`;
              }}
            />
          </div>

          {/* DETAILS */}

          <div className="public-profile-info">

            <span className="public-profile-label">
              AUTHOR PROFILE
            </span>

            <h1>{displayName}</h1>

            {profile.username && (
              <div className="public-profile-username">
                @{profile.username}
              </div>
            )}

            {profile.bio && (
              <p className="public-profile-bio">
                {profile.bio}
              </p>
            )}

            <div className="public-profile-details">

              {profile.location && (
                <span>
                  <FaMapMarkerAlt />
                  {profile.location}
                </span>
              )}

              {!profile.location &&
                profile.country && (
                  <span>
                    <FaMapMarkerAlt />
                    {profile.country}
                  </span>
                )}

              {profile.website && (
                <a
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : `https://${profile.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGlobe />
                  Website
                </a>
              )}

              {profile.created_at && (
                <span>
                  <FaCalendar />
                  Joined {formatDate(profile.created_at)}
                </span>
              )}

            </div>
          </div>

          {/* STATS */}

          <div className="public-profile-stat">
            <FaBookOpen />

            <strong>{blogs.length}</strong>

            <span>
              Published{" "}
              {blogs.length === 1
                ? "Blog"
                : "Blogs"}
            </span>
          </div>

        </div>

        {/* ==========================================
            BLOG SECTION
        ========================================== */}

        <section className="public-profile-blogs">

          <div className="public-profile-section-heading">

            <div>
              <span>FROM THE AUTHOR</span>

              <h2>
                Published{" "}
                <strong>Blogs</strong>
              </h2>
            </div>

            <span>
              {blogs.length}{" "}
              {blogs.length === 1
                ? "Article"
                : "Articles"}
            </span>

          </div>

          {/* ==========================================
              EMPTY
          ========================================== */}

          {blogs.length === 0 ? (
            <div className="public-profile-empty">

              <FaBookOpen />

              <h3>
                No published blogs yet
              </h3>

              <p>
                This author hasn't published
                any blogs yet.
              </p>

            </div>
          ) : (

            <div className="public-profile-blog-grid">

              {blogs.map((blog) => {

                const category = getCategory(
                  blog.category
                );

                return (
                  <div
                    key={blog.id}
                    className="public-profile-blog-card"
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="public-profile-blog-image"
                    >
                      <img
                        src={
                          blog.featured_image ||
                          FALLBACK_BLOG_IMAGE
                        }
                        alt={
                          blog.title ||
                          "Blog"
                        }
                        onError={(event) => {
                          event.currentTarget.onerror =
                            null;

                          event.currentTarget.src =
                            FALLBACK_BLOG_IMAGE;
                        }}
                      />
                    </Link>

                    {/* CONTENT */}

                    <div className="public-profile-blog-content">

                      {/* CATEGORY */}

                      {category ? (
                        <Link
                          to={`/category/${
                            category.slug ||
                            blog.category
                          }`}
                          className="public-profile-blog-category"
                        >
                          <FaTag />
                          {category.name}
                        </Link>
                      ) : blog.category ? (
                        <span className="public-profile-blog-category">
                          <FaTag />
                          {blog.category}
                        </span>
                      ) : null}

                      {/* TITLE */}

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="public-profile-blog-title-link"
                      >
                        <h3>
                          {blog.title ||
                            "Untitled Blog"}
                        </h3>
                      </Link>

                      {/* EXCERPT */}

                      {blog.excerpt && (
                        <p>
                          {blog.excerpt}
                        </p>
                      )}

                      {/* META */}

                      <div className="public-profile-blog-meta">

                        <span>
                          <FaCalendar />
                          {formatDate(
                            blog.created_at
                          )}
                        </span>

                        <span>
                          <FaUser />
                          {displayName}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

      </section>
    </main>
  );
};

export default PublicProfile;