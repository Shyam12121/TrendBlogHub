import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

import { getPublicProfiles } from "../../services/adminApi";

import "./ProfileDirectory.css";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=Author&background=2563eb&color=fff&size=200";

const getDisplayName = (user) => {
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user?.name || user?.username || "Author";
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProfileDirectory = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // LOAD PUBLIC PROFILES
  // ======================================================

  useEffect(() => {
    let mounted = true;

    const loadProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicProfiles();

        if (!mounted) return;

        let profileList = [];

        if (Array.isArray(data)) {
          profileList = data;
        } else if (Array.isArray(data?.users)) {
          profileList = data.users;
        } else if (Array.isArray(data?.profiles)) {
          profileList = data.profiles;
        } else if (Array.isArray(data?.items)) {
          profileList = data.items;
        }

        // ==================================================
        // HIDE ADMIN PROFILES
        // ==================================================

        const publicUsers = profileList.filter(
          (user) =>
            String(user?.role || "").toLowerCase() !== "admin"
        );

        setProfiles(publicUsers);
      } catch (err) {
        console.error("Public profiles error:", err);

        if (mounted) {
          setError(
            err?.response?.data?.detail ||
              "Unable to load public profiles. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfiles();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="profile-directory-page">
      <div className="profile-directory-container">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="profile-directory-header">
          <div>
            <span className="profile-directory-eyebrow">
              <FaUsers />
              Community
            </span>

            <h1>Authors</h1>

            <p>
              Discover authors from the TrendBlogHub community.
            </p>
          </div>

          {!loading && !error && (
            <div className="profile-directory-count">
              {profiles.length}{" "}
              {profiles.length === 1 ? "Author" : "Authors"}
            </div>
          )}
        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="profile-directory-loading">
            <div className="profile-directory-spinner"></div>
            <p>Loading authors...</p>
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div className="profile-directory-message profile-directory-error">
            <h3>Unable to load profiles</h3>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==================================================
            EMPTY
        ================================================== */}

        {!loading && !error && profiles.length === 0 && (
          <div className="profile-directory-message">
            <div className="profile-directory-empty-icon">
              <FaUsers />
            </div>

            <h3>No authors found</h3>

            <p>
              There are currently no public authors to display.
            </p>
          </div>
        )}

        {/* ==================================================
            AUTHOR TABLE
        ================================================== */}

        {!loading && !error && profiles.length > 0 && (
          <div className="profile-directory-table-wrapper">

            <table className="profile-directory-table">

              <thead>
                <tr>
                  <th>Author</th>
                  <th>Username</th>
                  <th>Country</th>
                  <th>Location</th>
                  <th>Blogs</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {profiles.map((user) => {
                  const displayName = getDisplayName(user);

                  const avatar =
                    user?.avatar?.trim() || FALLBACK_AVATAR;

                  const blogCount =
                    user?.blog_count ??
                    (Array.isArray(user?.blogs)
                      ? user.blogs.length
                      : 0);

                  return (
                    <tr
                      key={
                        user.id ||
                        user.username ||
                        displayName
                      }
                    >

                      {/* AUTHOR */}

                      <td>
                        <div className="profile-directory-author">

                          <img
                            src={avatar}
                            alt={displayName}
                            className="profile-directory-avatar"
                            onError={(event) => {
                              event.currentTarget.src =
                                FALLBACK_AVATAR;
                            }}
                          />

                          <div className="profile-directory-author-info">
                            <strong>{displayName}</strong>

                            {user?.bio && (
                              <span>{user.bio}</span>
                            )}
                          </div>

                        </div>
                      </td>

                      {/* USERNAME */}

                      <td>
                        {user?.username ? (
                          <span className="profile-directory-username">
                            @{user.username}
                          </span>
                        ) : (
                          <span className="profile-directory-muted">
                            -
                          </span>
                        )}
                      </td>

                      {/* COUNTRY */}

                      <td>
                        <span className="profile-directory-data">
                          {user?.country || "-"}
                        </span>
                      </td>

                      {/* LOCATION */}

                      <td>
                        {user?.location ? (
                          <span className="profile-directory-location">
                            <FaMapMarkerAlt />
                            {user.location}
                          </span>
                        ) : (
                          <span className="profile-directory-muted">
                            -
                          </span>
                        )}
                      </td>

                      {/* BLOGS */}

                      <td>
                        <span className="profile-directory-blog-count">
                          <FaBookOpen />
                          {blogCount}
                        </span>
                      </td>

                      {/* JOINED */}

                      <td>
                        <span className="profile-directory-joined">
                          <FaCalendarAlt />
                          {formatDate(user?.created_at)}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td>
                        {user?.username ? (
                          <Link
                            to={`/profile/${encodeURIComponent(
                              user.username
                            )}`}
                            className="profile-directory-view-button"
                          >
                            View Profile
                            <FaArrowRight />
                          </Link>
                        ) : (
                          <span className="profile-directory-muted">
                            -
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </main>
  );
};

export default ProfileDirectory;