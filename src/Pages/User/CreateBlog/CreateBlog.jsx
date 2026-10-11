import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaPenNib,
  FaImage,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import {
  createBlog,
} from "../../../services/adminApi";

import categories from "../../../data/categories";

import RichTextEditor from "../../../components/editor/RichTextEditor";

import "./CreateBlog.css";

const CATEGORY_LIST =
  Object.values(categories);

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

const getPlainText = (html) => {
  const div =
    document.createElement("div");

  div.innerHTML = html || "";

  return (
    div.textContent ||
    div.innerText ||
    ""
  )
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

// ==========================================
// FIELD ERROR COMPONENT
// ==========================================

const FieldError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="field-error">
      <FaExclamationCircle />
      <span>{message}</span>
    </div>
  );
};

const CreateBlog = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const formRef = useRef(null);

  const [formData, setFormData] =
    useState({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      meta_title: "",
      meta_description: "",
      status: "draft",
    });

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // VALIDATION STATE
  // ==========================================

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  // ==========================================
  // CLEAR SINGLE FIELD ERROR
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
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type)
    ) {
      toast.error(
        "Only JPG, PNG and WebP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
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

  // ==========================================
  // VALIDATE ONE FIELD
  // ==========================================

  const validateField = (name, value) => {
    switch (name) {
      case "title": {
        const trimmed = value.trim();

        if (!trimmed) {
          return "Please fill this field.";
        }

        if (trimmed.length < 5) {
          return "Title must be at least 5 characters.";
        }

        if (trimmed.length > 255) {
          return "Title must be under 255 characters.";
        }

        return "";
      }

      case "slug": {
        const trimmed = value.trim();

        if (!trimmed) {
          return "Please fill this field.";
        }

        if (!/^[a-z0-9-]+$/.test(trimmed)) {
          return "Slug can only contain lowercase letters, numbers and hyphens.";
        }

        if (trimmed.length < 3) {
          return "Slug must be at least 3 characters.";
        }

        return "";
      }

      case "category": {
        if (!value) {
          return "Please select a category.";
        }

        return "";
      }

      case "content": {
        const plain = getPlainText(value);

        if (!plain) {
          return "Please fill this field.";
        }

        if (plain.length < 20) {
          return "Content must be at least 20 characters.";
        }

        return "";
      }

      case "excerpt": {
        if (!value.trim()) return "";

        if (value.trim().length < 10) {
          return "Excerpt must be at least 10 characters (or leave empty).";
        }

        return "";
      }

      case "meta_title": {
        if (!value.trim()) return "";

        if (value.trim().length > 60) {
          return "Meta title must be under 60 characters.";
        }

        return "";
      }

      case "meta_description": {
        if (!value.trim()) return "";

        if (value.trim().length > 160) {
          return "Meta description must be under 160 characters.";
        }

        return "";
      }

      default:
        return "";
    }
  };

  // ==========================================
  // VALIDATE ALL FIELDS
  // ==========================================

  const validateForm = () => {
    const fields = [
      "title",
      "slug",
      "category",
      "content",
      "excerpt",
      "meta_title",
      "meta_description",
    ];

    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field]
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // Mark all as touched
    const allTouched = {};

    fields.forEach((field) => {
      allTouched[field] = true;
    });

    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // HANDLE BLUR
  // ==========================================

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error };
      }

      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ---------- VALIDATE ----------
    const isValid = validateForm();

    if (!isValid) {
      toast.error(
        "Please fix the highlighted fields before submitting."
      );

      // Scroll to first error
      setTimeout(() => {
        const firstError =
          document.querySelector(
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

    // ---------- CATEGORY CHECK ----------
    const selectedCategory =
      CATEGORY_LIST.find(
        (category) =>
          category.slug ===
          formData.category
      );

    if (!selectedCategory) {
      toast.error(
        "Invalid category selected."
      );

      return;
    }

    // ---------- SUBMIT ----------
    try {
      setLoading(true);

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "slug",
        formData.slug.trim()
      );

      data.append(
        "content",
        formData.content
      );

      data.append(
        "excerpt",
        formData.excerpt.trim()
      );

      data.append(
        "category",
        selectedCategory.slug
      );

      data.append(
        "meta_title",
        formData.meta_title.trim()
      );

      data.append(
        "meta_description",
        formData.meta_description.trim()
      );

      data.append(
        "status",
        formData.status
      );

      if (imageFile) {
        data.append(
          "featured_image",
          imageFile
        );
      }

      await createBlog(data);

      toast.success(
        "Blog created successfully!"
      );

      navigate("/user/blogs");
    } catch (error) {
      console.error(
        "Create blog error:",
        error
      );

      const detail =
        error?.response?.data?.detail;

      // Handle backend validation errors (FastAPI 422)
      if (Array.isArray(detail)) {
        const backendErrors = {};

        detail.forEach((err) => {
          const field = err.loc?.[err.loc.length - 1];

          if (field) {
            backendErrors[field] = err.msg;
          }
        });

        setErrors(backendErrors);

        toast.error(
          "Please check the highlighted fields."
        );
      } else {
        toast.error(
          detail || "Failed to create blog."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="create-blog-page">

      <div className="create-blog-header">

        <button
          type="button"
          className="create-back-btn"
          onClick={() =>
            navigate("/user")
          }
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <div className="create-blog-title">

          <div className="create-blog-icon">
            <FaPenNib />
          </div>

          <div>
            <h2>
              Create New Blog
            </h2>

            <p>
              Share your ideas with
              the world.
            </p>
          </div>

        </div>

      </div>

      <form
        ref={formRef}
        className="create-blog-form"
        onSubmit={handleSubmit}
        noValidate
      >

        <div className="create-blog-card">

          <div className="form-section-heading">
            <FaPenNib />
            <div>
              <h3>
                Blog Information
              </h3>

              <p>
                Add your blog details
                and content.
              </p>
            </div>
          </div>

          {/* ================= TITLE ================= */}

          <div
            className={`form-group ${
              touched.title && errors.title
                ? "has-error"
                : ""
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
              disabled={loading}
              className={
                touched.title && errors.title
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                touched.title
                  ? errors.title
                  : ""
              }
            />
          </div>

          {/* ================= SLUG ================= */}

          <div
            className={`form-group ${
              touched.slug && errors.slug
                ? "has-error"
                : ""
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
              disabled={loading}
              className={
                touched.slug && errors.slug
                  ? "input-error"
                  : ""
              }
            />

            {touched.slug && errors.slug ? (
              <FieldError message={errors.slug} />
            ) : (
              <small>
                URL-friendly version of
                your blog title.
              </small>
            )}
          </div>

          {/* ================= CATEGORY ================= */}

          <div
            className={`form-group ${
              touched.category && errors.category
                ? "has-error"
                : ""
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
              disabled={loading}
              className={
                touched.category && errors.category
                  ? "input-error"
                  : ""
              }
            >
              <option value="">
                Select Category
              </option>

              {CATEGORY_LIST.map(
                (category) => (
                  <option
                    key={category.slug}
                    value={category.slug}
                  >
                    {category.name}
                  </option>
                )
              )}

            </select>

            <FieldError
              message={
                touched.category
                  ? errors.category
                  : ""
              }
            />
          </div>

          {/* ================= FEATURED IMAGE ================= */}

          <div className="form-group">

            <label>
              Featured Image
            </label>

            <div className="image-upload-box">

              {!imagePreview ? (

                <button
                  type="button"
                  className="image-upload-btn"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={loading}
                >
                  <FaImage />

                  <span>
                    Upload Featured Image
                  </span>

                  <small>
                    JPG, PNG or WebP •
                    Max 5 MB
                  </small>
                </button>

              ) : (

                <div className="uploaded-image-preview">

                  <img
                    src={imagePreview}
                    alt="Featured preview"
                  />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                    disabled={loading}
                    title="Remove image"
                  >
                    <FaTimes />
                  </button>

                  <div className="uploaded-image-name">
                    {imageFile?.name}
                  </div>

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

          {/* ================= EXCERPT ================= */}

          <div
            className={`form-group ${
              touched.excerpt && errors.excerpt
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Excerpt
            </label>

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              placeholder="Write a short description for your blog..."
              disabled={loading}
              className={
                touched.excerpt && errors.excerpt
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                touched.excerpt
                  ? errors.excerpt
                  : ""
              }
            />
          </div>

          {/* ================= SEO ================= */}

          <div className="seo-section">

            <div className="form-section-heading seo-heading">
              <div>
                <h3>
                  SEO Settings
                </h3>

                <p>
                  Optimize this blog
                  for search engines.
                </p>
              </div>
            </div>

            <div
              className={`form-group ${
                touched.meta_title &&
                errors.meta_title
                  ? "has-error"
                  : ""
              }`}
            >
              <label>
                Meta Title
              </label>

              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={60}
                placeholder="SEO title for search engines..."
                disabled={loading}
                className={
                  touched.meta_title &&
                  errors.meta_title
                    ? "input-error"
                    : ""
                }
              />

              {touched.meta_title &&
              errors.meta_title ? (
                <FieldError
                  message={errors.meta_title}
                />
              ) : (
                <small>
                  {formData.meta_title.length}
                  /60 characters
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
              <label>
                Meta Description
              </label>

              <textarea
                name="meta_description"
                value={
                  formData.meta_description
                }
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={160}
                rows="4"
                placeholder="Write an SEO-friendly description..."
                disabled={loading}
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
                  message={
                    errors.meta_description
                  }
                />
              ) : (
                <small>
                  {
                    formData.meta_description
                      .length
                  }
                  /160 characters
                </small>
              )}
            </div>

          </div>

          {/* ================= CONTENT ================= */}

          <div
            className={`form-group ${
              touched.content && errors.content
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Blog Content <span>*</span>
            </label>

            <RichTextEditor
              value={formData.content}
              onChange={(content) => {
                setFormData((prev) => ({
                  ...prev,
                  content,
                }));

                clearError("content");

                setTouched((prev) => ({
                  ...prev,
                  content: true,
                }));
              }}
              disabled={loading}
              placeholder="Start writing your blog..."
            />

            {touched.content && errors.content ? (
              <FieldError
                message={errors.content}
              />
            ) : (
              <small>
                Use the toolbar to format
                headings, bold text, links,
                lists and more.
              </small>
            )}
          </div>

          {/* ================= STATUS ================= */}

          <div className="form-group">

            <label>
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="draft">
                Save as Draft
              </option>

              <option value="pending">
                Submit for Review
              </option>
            </select>

          </div>

          {/* ================= ACTIONS ================= */}

          <div className="create-blog-actions">

            <button
              type="button"
              className="create-cancel-btn"
              onClick={() =>
                navigate("/user")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-submit-btn"
              disabled={loading}
            >
              <FaSave />

              {loading
                ? "Creating..."
                : "Create Blog"}
            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default CreateBlog;