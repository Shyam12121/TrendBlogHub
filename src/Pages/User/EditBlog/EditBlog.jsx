import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaPenNib,
  FaImage,
  FaTimes,
  FaExclamationCircle,
  FaLock,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import {
  getMyBlog,
  updateMyBlog,
} from "../../../services/adminApi";

import categories from "../../../data/categories";

import RichTextEditor from "../../../components/editor/RichTextEditor";

import "../CreateBlog/CreateBlog.css";
import "./EditBlog.css";

const CATEGORY_LIST = Object.values(categories);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

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

const FieldError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="field-error">
      <FaExclamationCircle />
      <span>{message}</span>
    </div>
  );
};

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

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
  const [existingImage, setExistingImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ==========================================
  // LOAD BLOG
  // ==========================================

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);

        const blog = await getMyBlog(blogId);

        // 🚨 DRAFT-ONLY CHECK
       // 🚨 DRAFT + REJECTED CHECK
if (
  blog.status !== "draft" &&
  blog.status !== "rejected"
) {
  toast.error(
    "Only draft or rejected blogs can be edited. This blog has been submitted."
  );
  navigate("/user/blogs");
  return;
}

        setFormData({
          title: blog.title || "",
          slug: blog.slug || "",
          content: blog.content || "",
          excerpt: blog.excerpt || "",
          category: blog.category || "",
          meta_title: blog.meta_title || "",
          meta_description: blog.meta_description || "",
          status: blog.status || "draft",
        });

        if (blog.featured_image) {
          setExistingImage(blog.featured_image);
          setImagePreview(blog.featured_image);
        }
      } catch (error) {
        console.error("Load blog error:", error);

        toast.error(
          error?.response?.data?.detail ||
            "Failed to load blog."
        );

        navigate("/user/blogs");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) loadBlog();
  }, [blogId, navigate]);

  // ==========================================
  // CLEAR ERROR
  // ==========================================

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));

    clearError("title");
    clearError("slug");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      toast.error("Only JPG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setExistingImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateField = (name, value) => {
    switch (name) {
      case "title": {
        const t = value.trim();
        if (!t) return "Please fill this field.";
        if (t.length < 5)
          return "Title must be at least 5 characters.";
        return "";
      }

      case "slug": {
        const t = value.trim();
        if (!t) return "Please fill this field.";
        if (!/^[a-z0-9-]+$/.test(t))
          return "Slug can only contain lowercase letters, numbers and hyphens.";
        return "";
      }

      case "category":
        return value ? "" : "Please select a category.";

      case "content": {
        const plain = getPlainText(value);
        if (!plain) return "Please fill this field.";
        if (plain.length < 20)
          return "Content must be at least 20 characters.";
        return "";
      }

      case "meta_title":
        return value.trim().length > 60
          ? "Meta title must be under 60 characters."
          : "";

      case "meta_description":
        return value.trim().length > 160
          ? "Meta description must be under 160 characters."
          : "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const fields = [
      "title",
      "slug",
      "category",
      "content",
      "meta_title",
      "meta_description",
    ];

    const newErrors = {};
    const allTouched = {};

    fields.forEach((field) => {
      allTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);

    setErrors((prev) => {
      if (error) return { ...prev, [name]: error };
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fix the highlighted fields.");

      setTimeout(() => {
        const firstError = document.querySelector(
          ".form-group.has-error"
        );
        if (firstError) {
          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);

      return;
    }

    const selectedCategory = CATEGORY_LIST.find(
      (c) => c.slug === formData.category
    );

    if (!selectedCategory) {
      toast.error("Invalid category selected.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("slug", formData.slug.trim());
      data.append("content", formData.content);
      data.append("excerpt", formData.excerpt.trim());
      data.append("category", selectedCategory.slug);
      data.append("meta_title", formData.meta_title.trim());
      data.append(
        "meta_description",
        formData.meta_description.trim()
      );
      data.append("status", formData.status);

      if (imageFile) {
        data.append("featured_image", imageFile);
      }

      await updateMyBlog(blogId, data);

      toast.success("Blog updated successfully!");

      navigate("/user/blogs");
    } catch (error) {
      console.error("Update blog error:", error);

      const detail = error?.response?.data?.detail;

      if (Array.isArray(detail)) {
        const backendErrors = {};
        detail.forEach((err) => {
          const field = err.loc?.[err.loc.length - 1];
          if (field) backendErrors[field] = err.msg;
        });
        setErrors(backendErrors);
        toast.error("Please check the highlighted fields.");
      } else {
        toast.error(detail || "Failed to update blog.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="create-blog-page">
        <div className="create-blog-card" style={{ padding: 40, textAlign: "center" }}>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="create-blog-page">

      <div className="create-blog-header">
        <button
          type="button"
          className="create-back-btn"
          onClick={() => navigate("/user/blogs")}
        >
          <FaArrowLeft />
          Back to My Blogs
        </button>

        <div className="create-blog-title">
          <div className="create-blog-icon">
            <FaPenNib />
          </div>

          <div>
  <h2>
    {formData.status === "rejected"
      ? "Edit Rejected Blog"
      : "Edit Draft Blog"}
  </h2>
  <p>
    {formData.status === "rejected"
      ? "Fix the issues and resubmit for review."
      : "Update your draft before submitting."}
  </p>
</div>
        </div>
      </div>

      <form
        className="create-blog-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="create-blog-card">

          <div className="form-section-heading">
            <FaPenNib />
            <div>
              <h3>Blog Information</h3>
              <p>Update your blog details and content.</p>
            </div>
          </div>

          {/* TITLE */}
          <div
            className={`form-group ${
              touched.title && errors.title ? "has-error" : ""
            }`}
          >
            <label>
              Blog Title <span>*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              placeholder="Enter an attractive blog title..."
              disabled={saving}
              className={
                touched.title && errors.title ? "input-error" : ""
              }
            />

            <FieldError
              message={touched.title ? errors.title : ""}
            />
          </div>

          {/* SLUG */}
          <div
            className={`form-group ${
              touched.slug && errors.slug ? "has-error" : ""
            }`}
          >
            <label>
              Slug <span>*</span>
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your-blog-slug"
              disabled={saving}
              className={
                touched.slug && errors.slug ? "input-error" : ""
              }
            />

            {touched.slug && errors.slug ? (
              <FieldError message={errors.slug} />
            ) : (
              <small>URL-friendly version of your blog title.</small>
            )}
          </div>

          {/* CATEGORY */}
          <div
            className={`form-group ${
              touched.category && errors.category ? "has-error" : ""
            }`}
          >
            <label>
              Category <span>*</span>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={saving}
              className={
                touched.category && errors.category
                  ? "input-error"
                  : ""
              }
            >
              <option value="">Select Category</option>
              {CATEGORY_LIST.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <FieldError
              message={touched.category ? errors.category : ""}
            />
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label>Featured Image</label>

            <div className="image-upload-box">
              {!imagePreview ? (
                <button
                  type="button"
                  className="image-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={saving}
                >
                  <FaImage />
                  <span>Upload Featured Image</span>
                  <small>JPG, PNG or WebP • Max 5 MB</small>
                </button>
              ) : (
                <div className="uploaded-image-preview">
                  <img src={imagePreview} alt="Featured preview" />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                    disabled={saving}
                    title="Remove image"
                  >
                    <FaTimes />
                  </button>

                  {imageFile?.name && (
                    <div className="uploaded-image-name">
                      {imageFile.name}
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {/* EXCERPT */}
          <div className="form-group">
            <label>Excerpt</label>

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short description..."
              disabled={saving}
            />
          </div>

          {/* SEO */}
          <div className="seo-section">
            <div className="form-section-heading seo-heading">
              <div>
                <h3>SEO Settings</h3>
                <p>Optimize this blog for search engines.</p>
              </div>
            </div>

            <div
              className={`form-group ${
                touched.meta_title && errors.meta_title
                  ? "has-error"
                  : ""
              }`}
            >
              <label>Meta Title</label>

              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={60}
                placeholder="SEO title for search engines..."
                disabled={saving}
                className={
                  touched.meta_title && errors.meta_title
                    ? "input-error"
                    : ""
                }
              />

              {touched.meta_title && errors.meta_title ? (
                <FieldError message={errors.meta_title} />
              ) : (
                <small>
                  {formData.meta_title.length}/60 characters
                </small>
              )}
            </div>

            <div
              className={`form-group ${
                touched.meta_description &&
                errors.meta_description
                  ? "has-error"
                  : ""
              }`}
            >
              <label>Meta Description</label>

              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={160}
                rows="4"
                placeholder="Write an SEO-friendly description..."
                disabled={saving}
                className={
                  touched.meta_description &&
                  errors.meta_description
                    ? "input-error"
                    : ""
                }
              />

              {touched.meta_description &&
              errors.meta_description ? (
                <FieldError
                  message={errors.meta_description}
                />
              ) : (
                <small>
                  {formData.meta_description.length}/160 characters
                </small>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div
            className={`form-group ${
              touched.content && errors.content ? "has-error" : ""
            }`}
          >
            <label>
              Blog Content <span>*</span>
            </label>

            <RichTextEditor
              value={formData.content}
              onChange={(content) => {
                setFormData((prev) => ({ ...prev, content }));
                clearError("content");
                setTouched((prev) => ({ ...prev, content: true }));
              }}
              disabled={saving}
              placeholder="Start writing your blog..."
            />

            {touched.content && errors.content ? (
              <FieldError message={errors.content} />
            ) : (
              <small>
                Use the toolbar to format headings, bold text, links, lists and more.
              </small>
            )}
          </div>

          {/* STATUS */}
        {/* STATUS */}
<div className="form-group">
  <label>Status</label>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    disabled={saving}
  >
    {/* Rejected blogs ko dikhana but select nahi kar sakte */}
    {formData.status === "rejected" && (
      <option value="rejected" disabled>
        Rejected (edit and resubmit)
      </option>
    )}

    <option value="draft">Save as Draft</option>
    <option value="pending">Submit for Review</option>
  </select>

  {formData.status === "rejected" && (
    <div className="status-warning status-warning-rejected">
      <FaLock />
      <span>
        This blog was rejected by admin. Fix the issues and select{" "}
        <strong>Submit for Review</strong> to resubmit.
      </span>
    </div>
  )}

  {formData.status === "pending" && (
    <div className="status-warning">
      <FaLock />
      <span>
        Once submitted for review, you will not be able to edit this
        blog until the admin reviews it.
      </span>
    </div>
  )}
</div>

          {/* ACTIONS */}
          <div className="create-blog-actions">
            <button
              type="button"
              className="create-cancel-btn"
              onClick={() => navigate("/user/blogs")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-submit-btn"
              disabled={saving}
            >
              <FaSave />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default EditBlog;