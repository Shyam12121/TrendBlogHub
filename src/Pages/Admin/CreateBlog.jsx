import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaPenNib,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import { createBlog } from "../../services/adminApi";

import categories from "../../data/categories";

import RichTextEditor from "../../components/editor/RichTextEditor";

import "./BlogEditor.css";

const CATEGORY_LIST = Object.values(categories);

// ==========================================
// IMAGE SIZE LIMIT: 1 MB (server limit)
// ==========================================

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const MAX_IMAGE_SIZE_MB = 1;

const getPlainText = (html) => {
  const div = document.createElement("div");

  div.innerHTML = html || "";

  return (div.textContent || div.innerText || "")
    .replace(/\u00a0/g, " ")
    .trim();
};

const generateSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const CreateBlog = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  // ==========================================
  // IMAGE CHANGE — 1 MB VALIDATION
  // ==========================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");

      toast.error("Only JPG, PNG and WebP images are allowed.");

      event.target.value = "";
      return;
    }

    // ✅ NEW: 1 MB limit check
    if (file.size > MAX_IMAGE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

      const msg = `Image size is ${sizeMB} MB. Please upload an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`;

      setError(msg);

      toast.error(msg);

      event.target.value = "";
      return;
    }

    setError("");
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Blog title is required.");
      return;
    }

    if (!formData.slug.trim()) {
      setError("Blog slug is required.");
      return;
    }

    if (!getPlainText(formData.content)) {
      setError("Blog content is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    // ✅ Final safety check before submit
    if (imageFile && imageFile.size > MAX_IMAGE_SIZE) {
      setError(
        `Image must be less than ${MAX_IMAGE_SIZE_MB} MB. Please choose a smaller image.`
      );
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("slug", formData.slug.trim());
      data.append("content", formData.content);
      data.append("excerpt", formData.excerpt.trim());
      data.append("category", formData.category);
      data.append("meta_title", formData.meta_title.trim());
      data.append(
        "meta_description",
        formData.meta_description.trim()
      );
      data.append("status", formData.status);

      if (imageFile) {
        data.append("featured_image", imageFile);
      }

      await createBlog(data);

      toast.success("Blog created successfully!");

      navigate("/admin/blogs");
    } catch (err) {
      console.error("Create blog error:", err);

      // ==========================================
      // ✅ 413 HANDLING — Request Entity Too Large
      // ==========================================

      if (err?.response?.status === 413) {
        const msg = `Upload failed: Image is too large. Please upload an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`;

        setError(msg);

        toast.error(msg);

        return;
      }

      setError(
        err?.response?.data?.detail || "Failed to create blog."
      );

      toast.error(
        err?.response?.data?.detail || "Failed to create blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-editor-page">
      <div className="editor-topbar">
        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/admin/blogs")}
        >
          <FaArrowLeft />
          Back to Blogs
        </button>

        <div>
          <h1>Create New Blog</h1>

          <p>Create and publish beautiful content.</p>
        </div>
      </div>

      {error && (
        <div className="editor-error">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}

      <form
        className="blog-editor-layout"
        onSubmit={handleSubmit}
      >
        <div className="editor-main">
          <div className="editor-card">
            <div className="editor-card-title">
              <FaPenNib />

              <div>
                <h2>Blog Content</h2>

                <p>Write your complete article.</p>
              </div>
            </div>

            {/* TITLE */}
            <div className="editor-field">
              <label>Blog Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter an attractive blog title..."
                disabled={loading}
              />
            </div>

            {/* SLUG */}
            <div className="editor-field">
              <label>Slug</label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="your-blog-slug"
                disabled={loading}
              />
            </div>

            {/* CATEGORY */}
            <div className="editor-field">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Category</option>

                {CATEGORY_LIST.map((category) => (
                  <option
                    key={category.slug}
                    value={category.slug}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* EXCERPT */}
            <div className="editor-field">
              <label>Excerpt</label>

              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="4"
                placeholder="Write a short description..."
                disabled={loading}
              />
            </div>

            {/* CONTENT */}
            <div className="editor-field">
              <label>Content</label>

              <RichTextEditor
                value={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({
                    ...prev,
                    content,
                  }))
                }
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="editor-sidebar">
          {/* IMAGE */}
          <div className="editor-card">
            <div className="editor-card-title">
              <FaImage />

              <div>
                <h2>Featured Image</h2>

                {/* ✅ Updated text — 1 MB */}
                <p>JPG, PNG or WebP • Max {MAX_IMAGE_SIZE_MB} MB</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            {!imagePreview ? (
              <button
                type="button"
                className="admin-image-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                <FaImage />

                <strong>Upload Image</strong>

                <span>Choose a featured image</span>
              </button>
            ) : (
              <div className="admin-image-preview">
                <img src={imagePreview} alt="Featured preview" />

                <button
                  type="button"
                  className="admin-remove-image"
                  onClick={removeImage}
                  disabled={loading}
                  title="Remove image"
                >
                  <FaTimes />
                </button>

                <span>{imageFile?.name}</span>
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="editor-card">
            <h2>SEO Settings</h2>

            <div className="editor-field">
              <label>Meta Title</label>

              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                maxLength={60}
                placeholder="SEO meta title..."
                disabled={loading}
              />

              <small>{formData.meta_title.length}/60</small>
            </div>

            <div className="editor-field">
              <label>Meta Description</label>

              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                maxLength={160}
                rows="5"
                placeholder="SEO meta description..."
                disabled={loading}
              />

              <small>
                {formData.meta_description.length}/160
              </small>
            </div>
          </div>

          {/* PUBLISHING */}
          <div className="editor-card">
            <h2>Publishing</h2>

            <div className="editor-field">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="draft">Draft</option>

                <option value="pending">Pending</option>

                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="publish-btn"
            disabled={loading}
          >
            <FaSave />

            {loading
              ? "Saving..."
              : formData.status === "published"
              ? "Publish Blog"
              : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;