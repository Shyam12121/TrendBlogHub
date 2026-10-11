import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaNewspaper,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaEye,
  FaEdit,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaChevronDown,
  FaLock,
  FaBan,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";

import {
  getAdminBlogs,
  updateBlogStatus,
  deleteAdminBlog,
} from "../../services/adminApi";

import "./AdminBlogs.css";

const AdminBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  // 🎯 Bulk selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // 🎯 Bulk action dropdown (not applied until Submit clicked)
  const [bulkAction, setBulkAction] = useState("");

  // Per-row pending change (dropdown choose karo but submit karne pe apply)
  const [pendingChanges, setPendingChanges] = useState({});

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [error, setError] = useState("");

  // =========================================
  // LOAD BLOGS
  // =========================================

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminBlogs();

      const blogList = Array.isArray(data)
        ? data
        : data?.blogs || data?.data || [];

      setBlogs(blogList);
      setFilteredBlogs(blogList);

      // Reset selection & pending
      setSelectedIds(new Set());
      setPendingChanges({});
      setBulkAction("");
    } catch (error) {
      console.error("Blogs API Error:", error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // =========================================
  // FILTER
  // =========================================

  useEffect(() => {
    let result = [...blogs];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((blog) =>
        blog.title?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (blog) => blog.status === statusFilter
      );
    }

    setFilteredBlogs(result);
  }, [search, statusFilter, blogs]);

  // =========================================
  // HELPERS
  // =========================================

  const isDraft = (blog) => blog?.status === "draft";

  const isSelectable = (blog) => !isDraft(blog);

  // =========================================
  // SELECTION HANDLERS
  // =========================================

  const toggleSelect = (blogId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(blogId)) {
        next.delete(blogId);
      } else {
        next.add(blogId);
      }
      return next;
    });
  };

  const selectableFilteredIds = filteredBlogs
    .filter(isSelectable)
    .map((b) => b.id);

  const allFilteredSelected =
    selectableFilteredIds.length > 0 &&
    selectableFilteredIds.every((id) => selectedIds.has(id));

  const someFilteredSelected =
    selectableFilteredIds.some((id) => selectedIds.has(id)) &&
    !allFilteredSelected;

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (allFilteredSelected) {
        // Deselect all filtered
        selectableFilteredIds.forEach((id) =>
          next.delete(id)
        );
      } else {
        // Select all filtered
        selectableFilteredIds.forEach((id) =>
          next.add(id)
        );
      }

      return next;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    setBulkAction("");
  };

  // =========================================
  // BULK SUBMIT
  // =========================================

  const handleBulkSubmit = async () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one blog.");
      return;
    }

    if (!bulkAction) {
      alert(
        "Please choose an action (Published / Pending / Rejected)."
      );
      return;
    }

    // Confirm
    const confirmMsg = `Apply "${bulkAction}" to ${selectedIds.size} blog(s)?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      setBulkLoading(true);

      // Run updates in parallel
      const ids = Array.from(selectedIds);

      const results = await Promise.allSettled(
        ids.map((id) => updateBlogStatus(id, bulkAction))
      );

      // Count success/failure
      let successCount = 0;
      let failCount = 0;

      const updatedMap = {};

      results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
          successCount++;
          updatedMap[ids[idx]] = bulkAction;
        } else {
          failCount++;
          console.error(
            `Failed to update blog ${ids[idx]}:`,
            result.reason
          );
        }
      });

      // Update local state
      setBlogs((prev) =>
        prev.map((b) =>
          updatedMap[b.id]
            ? { ...b, status: updatedMap[b.id] }
            : b
        )
      );

      // Reset
      clearSelection();

      if (failCount === 0) {
        alert(
          `✅ Successfully updated ${successCount} blog(s).`
        );
      } else {
        alert(
          `⚠️ ${successCount} succeeded, ${failCount} failed. Check console for details.`
        );
      }
    } catch (error) {
      console.error("Bulk update error:", error);
      alert("Bulk update failed.");
    } finally {
      setBulkLoading(false);
    }
  };

  // =========================================
  // PER-ROW DROPDOWN CHANGE (only stores locally)
  // =========================================

  const getCurrentValue = (blog) =>
    pendingChanges[blog.id] !== undefined
      ? pendingChanges[blog.id]
      : blog.status;

  const hasChange = (blog) =>
    pendingChanges[blog.id] !== undefined &&
    pendingChanges[blog.id] !== blog.status;

  const handleStatusSelect = (blog, newStatus) => {
    if (isDraft(blog)) return;

    if (newStatus === "draft") {
      alert(
        "You cannot move a submitted blog directly to draft. Use 'Rejected' instead."
      );
      return;
    }

    setPendingChanges((prev) => ({
      ...prev,
      [blog.id]: newStatus,
    }));
  };

  const handleCancelChange = (blogId) => {
    setPendingChanges((prev) => {
      const next = { ...prev };
      delete next[blogId];
      return next;
    });
  };

  const handleSubmitChange = async (blog) => {
    const newStatus = pendingChanges[blog.id];

    if (!newStatus || newStatus === blog.status) {
      return;
    }

    if (newStatus === "rejected") {
      const confirmed = window.confirm(
        `Reject "${blog.title}"?\n\nThe blog will be marked as REJECTED. The user can edit it and resubmit.`
      );

      if (!confirmed) return;
    }

    try {
      setActionLoading(blog.id);

      const updatedBlog = await updateBlogStatus(
        blog.id,
        newStatus
      );

      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blog.id
            ? {
                ...b,
                ...(updatedBlog || {}),
                status: newStatus,
              }
            : b
        )
      );

      handleCancelChange(blog.id);
    } catch (error) {
      console.error("Blog status error:", error);

      alert(
        error?.response?.data?.detail ||
          "Unable to update blog status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(`delete-${blogId}`);

      await deleteAdminBlog(blogId);

      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== blogId)
      );

      // Remove from selection
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(blogId);
        return next;
      });
    } catch (error) {
      console.error("Delete blog error:", error);

      alert(
        error?.response?.data?.detail ||
          "Unable to delete blog."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================================
  // EDIT GUARD
  // =========================================

  const handleEditClick = (blog) => {
    if (isDraft(blog)) {
      alert(
        "Draft blogs belong to the user. You cannot edit them until they are submitted for review."
      );
      return;
    }

    navigate(`/admin/blogs/edit/${blog.id}`);
  };

  // =========================================
  // STATS
  // =========================================

  const totalBlogs = blogs.length;

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const pendingBlogs = blogs.filter(
    (blog) => blog.status === "pending"
  ).length;

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const rejectedBlogs = blogs.filter(
    (blog) => blog.status === "rejected"
  ).length;

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loader"></div>
        <h3>Loading blogs...</h3>
        <p>Fetching blogs from your database</p>
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="admin-blogs-page">

      {/* HEADER */}

      <div className="admin-blogs-header">
        <div>
          <div className="admin-page-breadcrumb">
            Admin Panel / Blogs
          </div>

          <h1>Blog Management</h1>

          <p>
            Review, manage and moderate all blog
            posts.
          </p>
        </div>

        <div className="admin-blog-header-actions">
          <button
            className="admin-create-blog-btn"
            onClick={() =>
              navigate("/admin/blogs/create")
            }
          >
            <FaPlus />
            Create Blog
          </button>

          <button
            className="admin-refresh-btn"
            onClick={loadBlogs}
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="blogs-stats">
        <div className="blog-stat-card">
          <div className="blog-stat-icon blue">
            <FaNewspaper />
          </div>
          <div>
            <span>Total Blogs</span>
            <strong>{totalBlogs}</strong>
          </div>
        </div>

        <div className="blog-stat-card">
          <div className="blog-stat-icon green">
            <FaCheckCircle />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedBlogs}</strong>
          </div>
        </div>

        <div className="blog-stat-card">
          <div className="blog-stat-icon orange">
            <FaClock />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingBlogs}</strong>
          </div>
        </div>

        <div className="blog-stat-card">
          <div className="blog-stat-icon red">
            <FaBan />
          </div>
          <div>
            <span>Rejected</span>
            <strong>{rejectedBlogs}</strong>
          </div>
        </div>

        <div className="blog-stat-card">
          <div className="blog-stat-icon purple">
            <FaNewspaper />
          </div>
          <div>
            <span>Drafts</span>
            <strong>{draftBlogs}</strong>
          </div>
        </div>
      </div>

      {error && (
        <div className="admin-blogs-error">
          {error}
        </div>
      )}

      {/* ==========================================
          BULK ACTION BAR (shows when some selected)
      ========================================== */}

      {selectedIds.size > 0 && (
        <div className="bulk-action-bar">
          <div className="bulk-action-info">
            <strong>{selectedIds.size}</strong>{" "}
            blog{selectedIds.size > 1 ? "s" : ""} selected
          </div>

          <div className="bulk-action-controls">
            <select
              value={bulkAction}
              onChange={(e) =>
                setBulkAction(e.target.value)
              }
              className="bulk-action-select"
            >
              <option value="">Choose action...</option>
              <option value="published">Publish</option>
              <option value="pending">Move to Pending</option>
              <option value="rejected">Reject</option>
            </select>

            <button
              type="button"
              className="bulk-action-submit"
              onClick={handleBulkSubmit}
              disabled={bulkLoading || !bulkAction}
            >
              <FaPaperPlane />
              {bulkLoading
                ? "Applying..."
                : "Submit"}
            </button>

            <button
              type="button"
              className="bulk-action-clear"
              onClick={clearSelection}
              disabled={bulkLoading}
            >
              <FaTimes />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* TABLE PANEL */}

      <div className="blogs-table-panel">

        <div className="blogs-toolbar">
          <div className="blogs-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="blog-status-filter">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="all">All Status</option>
              <option value="published">
                Published
              </option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>
            <FaChevronDown />
          </div>
        </div>

        {/* TABLE */}

        <div className="blogs-table-wrapper">

          <table className="blogs-table">

            <thead>
              <tr>
                {/* ✅ SELECT ALL CHECKBOX */}
                <th className="col-checkbox">
                  <input
                    type="checkbox"
                    className="row-checkbox"
                    checked={allFilteredSelected}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate =
                          someFilteredSelected;
                      }
                    }}
                    onChange={toggleSelectAll}
                    disabled={
                      selectableFilteredIds.length === 0
                    }
                    title="Select all (filtered)"
                  />
                </th>

                <th>Blog</th>
                <th>Author</th>
                <th>Status</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="blogs-empty"
                  >
                    <FaNewspaper />
                    <strong>No blogs found</strong>
                    <span>
                      Try changing your search or
                      filter.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => {
                  const draft = isDraft(blog);
                  const rejected =
                    blog.status === "rejected";
                  const selected = selectedIds.has(
                    blog.id
                  );

                  const currentValue =
                    getCurrentValue(blog);
                  const changed = hasChange(blog);

                  return (
                    <tr
                      key={blog.id}
                      className={`${
                        draft
                          ? "blog-row-draft"
                          : rejected
                          ? "blog-row-rejected"
                          : ""
                      } ${
                        selected
                          ? "blog-row-selected"
                          : ""
                      }`}
                    >

                      {/* ✅ ROW CHECKBOX */}

                      <td className="col-checkbox">
                        <input
                          type="checkbox"
                          className="row-checkbox"
                          checked={selected}
                          onChange={() =>
                            toggleSelect(blog.id)
                          }
                          disabled={!isSelectable(blog)}
                          title={
                            draft
                              ? "Draft blogs cannot be selected"
                              : "Select this blog"
                          }
                        />
                      </td>

                      {/* BLOG */}

                      <td>
                        <div className="blog-table-title">
                          <div className="blog-table-image">
                            {blog.featured_image ? (
                              <img
                                src={
                                  blog.featured_image
                                }
                                alt={
                                  blog.title ||
                                  "Blog"
                                }
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="blog-table-icon">
                                <FaNewspaper />
                              </div>
                            )}
                          </div>

                          <div>
                            <strong>
                              {blog.title ||
                                "Untitled Blog"}
                            </strong>
                            <span>
                              {blog.category ||
                                "General"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* AUTHOR */}

                      <td>
                        <span className="blog-author">
                          {blog.author_name ||
                            blog.author?.name ||
                            blog.user?.name ||
                            (blog.author_id
                              ? `Author #${blog.author_id}`
                              : "Unknown")}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <div className="blog-status-cell">
                          <div className="blog-status-control">
                            <select
                              value={currentValue}
                              disabled={
                                draft ||
                                actionLoading ===
                                  blog.id
                              }
                              title={
                                draft
                                  ? "Draft blogs cannot be published. The user must submit them for review first."
                                  : ""
                              }
                              onChange={(e) =>
                                handleStatusSelect(
                                  blog,
                                  e.target.value
                                )
                              }
                            >
                              <option value="published">
                                Published
                              </option>
                              <option value="pending">
                                Pending
                              </option>
                              <option value="rejected">
                                Rejected
                              </option>
                              <option
                                value="draft"
                                disabled
                              >
                                Draft
                              </option>
                            </select>
                            <FaChevronDown />
                          </div>

                          {!draft && changed && (
                            <div className="blog-status-submit-row">
                              <button
                                type="button"
                                className="blog-status-submit"
                                disabled={
                                  actionLoading ===
                                  blog.id
                                }
                                onClick={() =>
                                  handleSubmitChange(
                                    blog
                                  )
                                }
                              >
                                <FaPaperPlane />
                                {actionLoading ===
                                blog.id
                                  ? "Submitting..."
                                  : "Submit"}
                              </button>

                              <button
                                type="button"
                                className="blog-status-cancel"
                                disabled={
                                  actionLoading ===
                                  blog.id
                                }
                                onClick={() =>
                                  handleCancelChange(
                                    blog.id
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {draft && (
                            <div className="draft-lock-note">
                              <FaLock />
                              <span>
                                User must submit
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* ID */}

                      <td>
                        <span className="blog-id">
                          #{blog.id}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="blog-actions">
                          <button
                            className="blog-view-btn"
                            title="View blog"
                            onClick={() => {
                              if (blog.slug) {
                                window.open(
                                  `/blog/${blog.slug}`,
                                  "_blank"
                                );
                              } else {
                                alert(
                                  "This blog does not have a slug."
                                );
                              }
                            }}
                          >
                            <FaEye />
                          </button>

                          <button
                            className="blog-edit-btn"
                            title={
                              draft
                                ? "Draft blogs cannot be edited by admin"
                                : "Edit blog"
                            }
                            disabled={draft}
                            onClick={() =>
                              handleEditClick(blog)
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="blog-delete-btn"
                            title="Delete blog"
                            disabled={
                              actionLoading ===
                              `delete-${blog.id}`
                            }
                            onClick={() =>
                              handleDelete(blog.id)
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;