import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaPenNib,
  FaTimes,
} from "react-icons/fa";

import {
  getAdminBlog,
  updateBlog,
} from "../../services/adminApi";

import categories from "../../data/categories";

import RichTextEditor from "../../components/editor/RichTextEditor";

import "./BlogEditor.css";

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

const EditBlog = () => {
  const navigate = useNavigate();

  const { blogId } =
    useParams();

  const fileInputRef = useRef(null);

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

  const [existingImage, setExistingImage] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const blog =
        await getAdminBlog(blogId);

      setFormData({
        title: blog?.title || "",
        slug: blog?.slug || "",
        content: blog?.content || "",
        excerpt: blog?.excerpt || "",
        category: blog?.category || "",
        meta_title:
          blog?.meta_title || "",
        meta_description:
          blog?.meta_description || "",
        status:
          blog?.status || "draft",
      });

      setExistingImage(
        blog?.featured_image || ""
      );

    } catch (err) {
      console.error(
        "Load blog error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Unable to load blog."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type)
    ) {
      setError(
        "Only JPG, PNG and WebP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError(
        "Featured image must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setError("");
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

  const removeNewImage = () => {
    setImageFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError(
        "Blog title is required."
      );
      return;
    }

    if (!formData.slug.trim()) {
      setError(
        "Blog slug is required."
      );
      return;
    }

    if (
      !getPlainText(
        formData.content
      )
    ) {
      setError(
        "Blog content is required."
      );
      return;
    }

    try {
      setSaving(true);

      const data =
        new FormData();

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
        formData.category
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

      await updateBlog(
        blogId,
        data
      );

      navigate("/admin/blogs");

    } catch (err) {
      console.error(
        "Update blog error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Failed to update blog."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-editor-loading">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="blog-editor-page">

      <div className="editor-topbar">

        <button
          className="back-btn"
          type="button"
          onClick={() =>
            navigate("/admin/blogs")
          }
        >
          <FaArrowLeft />
          Back to Blogs
        </button>

        <div>
          <h1>
            Edit Blog
          </h1>

          <p>
            Update and manage this
            blog post.
          </p>
        </div>

      </div>

      {error && (
        <div className="editor-error">
          {error}
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
                <h2>
                  Blog Content
                </h2>

                <p>
                  Edit the article
                  content.
                </p>
              </div>
            </div>

            <div className="editor-field">

              <label>
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={saving}
              />

            </div>

            <div className="editor-field">

              <label>
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                disabled={saving}
              />

            </div>

            <div className="editor-field">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={saving}
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

            </div>

            <div className="editor-field">

              <label>
                Excerpt
              </label>

              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="4"
                disabled={saving}
              />

            </div>

            <div className="editor-field">

              <label>
                Content
              </label>

              <RichTextEditor
                value={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({
                    ...prev,
                    content,
                  }))
                }
                disabled={saving}
              />

            </div>

          </div>

        </div>

        <div className="editor-sidebar">

          {/* FEATURED IMAGE */}

          <div className="editor-card">

            <div className="editor-card-title">
              <FaImage />

              <div>
                <h2>
                  Featured Image
                </h2>

                <p>
                  Upload a new image
                  to replace current.
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            {imagePreview ? (

              <div className="admin-image-preview">

                <img
                  src={imagePreview}
                  alt="New featured preview"
                />

                <button
                  type="button"
                  className="admin-remove-image"
                  onClick={removeNewImage}
                  disabled={saving}
                >
                  <FaTimes />
                </button>

                <span>
                  New image selected
                </span>

              </div>

            ) : existingImage ? (

              <div className="admin-image-preview">

                <img
                  src={existingImage}
                  alt="Current featured"
                />

                <button
                  type="button"
                  className="admin-change-image-btn"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={saving}
                >
                  Change Image
                </button>

              </div>

            ) : (

              <button
                type="button"
                className="admin-image-upload-btn"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={saving}
              >
                <FaImage />

                <strong>
                  Upload Image
                </strong>

                <span>
                  JPG, PNG or WebP
                </span>
              </button>

            )}

          </div>

          {/* SEO */}

          <div className="editor-card">

            <h2>
              SEO Settings
            </h2>

            <div className="editor-field">

              <label>
                Meta Title
              </label>

              <input
                type="text"
                name="meta_title"
                value={
                  formData.meta_title
                }
                onChange={handleChange}
                maxLength={60}
                disabled={saving}
              />

              <small>
                {
                  formData.meta_title
                    .length
                }
                /60
              </small>

            </div>

            <div className="editor-field">

              <label>
                Meta Description
              </label>

              <textarea
                name="meta_description"
                value={
                  formData.meta_description
                }
                onChange={handleChange}
                maxLength={160}
                rows="5"
                disabled={saving}
              />

              <small>
                {
                  formData.meta_description
                    .length
                }
                /160
              </small>

            </div>

          </div>

          {/* STATUS */}

          <div className="editor-card">

            <h2>
              Publishing
            </h2>

            <div className="editor-field">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="draft">
                  Draft
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="published">
                  Published
                </option>
              </select>

            </div>

          </div>

          <button
            type="submit"
            className="publish-btn"
            disabled={saving}
          >
            <FaSave />

            {saving
              ? "Saving Changes..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditBlog;