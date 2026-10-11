import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaNewspaper,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaArrowLeft,
  FaFilter,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import {
  getMyBlogs,
  deleteMyBlog,
} from "../../../services/adminApi";

import "./UserBlogs.css";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "draft", label: "Drafts" },
  { key: "pending", label: "Pending" },
  { key: "published", label: "Published" },
  { key: "rejected", label: "Rejected" },
];

const UserBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const data = await getMyBlogs();

      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      toast.error("Failed to load your blogs.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeletingId(blogId);

      await deleteMyBlog(blogId);

      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== blogId)
      );

      toast.success("Blog deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);

      toast.error(
        error?.response?.data?.detail ||
          "Failed to delete blog."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "No date";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === activeTab);

  const counts = {
    all: blogs.length,
    draft: blogs.filter((b) => b.status === "draft").length,
    pending: blogs.filter((b) => b.status === "pending").length,
    published: blogs.filter((b) => b.status === "published").length,
    rejected: blogs.filter((b) => b.status === "rejected").length,
  };

  return (
    <div className="user-blogs-page">
      {/* HEADER */}

      <div className="user-blogs-header">
        <button
          type="button"
          className="user-blogs-back"
          onClick={() => navigate("/user")}
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <div className="user-blogs-title-row">
          <div>
            <h2>My Blogs</h2>
            <p>
              Manage all your drafts, pending submissions
              and published posts.
            </p>
          </div>

          <button
            type="button"
            className="user-blogs-create-btn"
            onClick={() => navigate("/user/blogs/create")}
          >
            <FaPlus />
            New Blog
          </button>
        </div>
      </div>

      {/* FILTER TABS */}

      <div className="user-blogs-tabs">
        <div className="user-blogs-tabs-icon">
          <FaFilter />
        </div>

        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`user-blogs-tab ${
              activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="user-blogs-tab-count">
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* LIST */}

      <div className="user-blogs-card">
        {loading ? (
          <div className="user-blogs-empty">
            Loading your blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="user-blogs-empty">
            <FaNewspaper />

            <h4>
              {activeTab === "all"
                ? "No blogs yet"
                : `No ${activeTab} blogs`}
            </h4>

            <p>
              {activeTab === "all"
                ? "Start sharing your ideas with the world."
                : "Try a different filter to see other blogs."}
            </p>

            {activeTab === "all" && (
              <button
                type="button"
                className="user-blogs-create-btn small"
                onClick={() =>
                  navigate("/user/blogs/create")
                }
              >
                <FaPlus />
                Create Your First Blog
              </button>
            )}
          </div>
        ) : (
          <div className="user-blogs-list">
            {filteredBlogs.map((blog) => {
              // ✅ Draft aur Rejected dono editable hain
              const isEditable =
                blog.status === "draft" ||
                blog.status === "rejected";

              return (
                <div
                  className="user-blogs-item"
                  key={blog.id}
                >
                  <div className="user-blogs-thumb">
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title || "Blog"}
                      />
                    ) : (
                      <FaNewspaper />
                    )}
                  </div>

                  <div className="user-blogs-info">
                    <h4>
                      {blog.title || "Untitled Blog"}
                    </h4>

                    <div className="user-blogs-meta">
                      <span>
                        {blog.category || "General"}
                      </span>
                      <span>•</span>
                      <span>
                        {formatDate(blog.created_at)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`user-blogs-status ${
                      blog.status || "draft"
                    }`}
                  >
                    {blog.status || "draft"}
                  </span>

                  <div className="user-blogs-actions">
                    {/* ✅ Draft + Rejected editable */}

                    {isEditable && (
                      <button
                        type="button"
                        className="user-blogs-action edit"
                        title={
                          blog.status === "rejected"
                            ? "Edit rejected blog"
                            : "Edit draft"
                        }
                        onClick={() =>
                          navigate(
                            `/user/blogs/edit/${blog.id}`
                          )
                        }
                      >
                        <FaEdit />
                      </button>
                    )}

                    <button
                      type="button"
                      className="user-blogs-action view"
                      title="View"
                      onClick={() =>
                        navigate(
                          `/blog/${blog.slug || blog.id}`
                        )
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      className="user-blogs-action delete"
                      title="Delete"
                      disabled={deletingId === blog.id}
                      onClick={() =>
                        handleDelete(blog.id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;