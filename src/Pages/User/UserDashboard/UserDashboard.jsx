import { useEffect, useState } from "react";

import {
  FaNewspaper,
  FaCheckCircle,
  FaFileAlt,
  FaPen,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getMyBlogs } from "../../../services/adminApi";

import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const data = await getMyBlogs();

      setBlogs(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load user blogs:",
        error
      );

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const totalBlogs = blogs.length;

  const publishedBlogs = blogs.filter(
    (blog) =>
      blog.status === "published"
  ).length;

  const draftBlogs = blogs.filter(
    (blog) =>
      blog.status === "draft"
  ).length;

  const pendingBlogs = blogs.filter(
    (blog) =>
      blog.status === "pending"
  ).length;

  const recentBlogs = blogs.slice(0, 5);

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "No date";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="user-dashboard">

      {/* WELCOME */}

      <div className="user-welcome">

        <div>
          <span className="user-welcome-label">
            Welcome back 👋
          </span>

          <h2>
            {user.name || "Creator"}
          </h2>

          <p>
            Manage your content and grow
            your audience.
          </p>
        </div>

        <button
          type="button"
          className="user-create-btn"
          onClick={() =>
            navigate(
              "/user/blogs/create"
            )
          }
        >
          <FaPlus />
          Create New Blog
        </button>

      </div>

      {/* STATS */}

      <div className="user-stats-grid">

        <div className="user-stat-card">
          <div className="user-stat-icon blue">
            <FaNewspaper />
          </div>

          <div>
            <span>Total Blogs</span>

            <strong>
              {loading
                ? "..."
                : totalBlogs}
            </strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Published</span>

            <strong>
              {loading
                ? "..."
                : publishedBlogs}
            </strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon orange">
            <FaFileAlt />
          </div>

          <div>
            <span>Drafts</span>

            <strong>
              {loading
                ? "..."
                : draftBlogs}
            </strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon purple">
            <FaPen />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {loading
                ? "..."
                : pendingBlogs}
            </strong>
          </div>
        </div>

      </div>

      {/* RECENT BLOGS */}

      <div className="user-dashboard-section">

        <div className="user-section-header">

          <div>
            <h3>
              Recent Blogs
            </h3>

            <p>
              Your latest content
            </p>
          </div>

          <button
            type="button"
            className="user-view-all"
            onClick={() =>
              navigate("/user/blogs")
            }
          >
            View All
            <FaArrowRight />
          </button>

        </div>

        <div className="user-recent-card">

          {loading ? (

            <div className="user-empty-state">
              Loading your blogs...
            </div>

          ) : recentBlogs.length === 0 ? (

            <div className="user-empty-state">

              <FaNewspaper />

              <h4>
                No blogs yet
              </h4>

              <p>
                Start sharing your ideas
                with the world.
              </p>

              <button
                type="button"
                className="user-create-btn small"
                onClick={() =>
                  navigate(
                    "/user/blogs/create"
                  )
                }
              >
                <FaPlus />
                Create Your First Blog
              </button>

            </div>

          ) : (

            <div className="user-blog-list">

              {recentBlogs.map(
                (blog) => (

                  <div
                    className="user-recent-blog"
                    key={blog.id}
                  >

                    <div className="user-recent-image">

                      {blog.featured_image ? (

                        <img
                          src={
                            blog.featured_image
                          }
                          alt={
                            blog.title ||
                            "Blog"
                          }
                        />

                      ) : (

                        <FaNewspaper />

                      )}

                    </div>

                    <div className="user-recent-info">

                      <h4>
                        {blog.title ||
                          "Untitled Blog"}
                      </h4>

                      <div className="user-recent-meta">

                        <span>
                          {blog.category ||
                            "General"}
                        </span>

                        <span>
                          {formatDate(
                            blog.created_at
                          )}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`user-status ${
                        blog.status ||
                        "draft"
                      }`}
                    >
                      {blog.status ||
                        "draft"}
                    </span>

                    {/* NO EDIT BUTTON FOR USER */}

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;