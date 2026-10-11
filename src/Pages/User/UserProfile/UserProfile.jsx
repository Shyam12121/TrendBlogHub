
import { useEffect, useRef, useState } from "react";

import {
  FaCamera,
  FaGlobe,
  FaMapMarkerAlt,
  FaLink,
  FaEnvelope,
  FaUser,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaEdit,
  FaTimes,
  FaSave,
  FaKey,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  uploadCover,
} from "../../../services/adminApi";
import "./UserProfile.css";

// ======================================================
// ALL COUNTRIES
// ======================================================

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// ======================================================
// COMPONENT
// ======================================================

const UserProfile = () => {
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    location: "",
    website: "",
    bio: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showEmailSection, setShowEmailSection] =
    useState(false);

  const [newEmail, setNewEmail] = useState("");

  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [passwordSaving, setPasswordSaving] =
    useState(false);

  const [error, setError] = useState("");

  // ======================================================
  // LOAD PROFILE FROM BACKEND
  // ======================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const profile = await getProfile();

        const name = profile.name || "";

        const nameParts = name.trim().split(" ");

        setForm({
          username: profile.username || "",
          firstName:
            profile.first_name ||
            nameParts[0] ||
            "",
          lastName:
            profile.last_name ||
            nameParts.slice(1).join(" ") ||
            "",
          email: profile.email || "",
          country: profile.country || "India",
          location: profile.location || "",
          website: profile.website || "",
          bio: profile.bio || "",
        });

        setNewEmail(profile.email || "");

        // Backend image URLs, if available
        if (profile.avatar) {
          setAvatarPreview(profile.avatar);
        } else {
          const storedAvatar =
            localStorage.getItem(
              "user_profile_avatar"
            );

          if (storedAvatar) {
            setAvatarPreview(storedAvatar);
          }
        }

        if (profile.cover_image) {
          setCoverPreview(profile.cover_image);
        } else {
          const storedCover =
            localStorage.getItem(
              "user_profile_cover"
            );

          if (storedCover) {
            setCoverPreview(storedCover);
          }
        }

        // Keep localStorage user synchronized
        const oldUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...oldUser,
            ...profile,
          })
        );
      } catch (err) {
        console.error(
          "Failed to load profile:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "bio" &&
      value.length > 200
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  // ======================================================
  // IMAGE UPLOAD
  // ======================================================
const handleImageUpload = async (event, type) => {
  const file = event.target.files?.[0];

  if (!file) return;

  // Validate image
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    event.target.value = "";
    return;
  }

  // Maximum 5 MB
  if (file.size > 5 * 1024 * 1024) {
    alert("Image size must be less than 5 MB.");
    event.target.value = "";
    return;
  }

  try {
    setError("");
    setSaved(false);

    // Immediate browser preview
    const localPreview = URL.createObjectURL(file);

    if (type === "avatar") {
      setAvatarPreview(localPreview);
    } else {
      setCoverPreview(localPreview);
    }

    // Upload to backend
    const response =
      type === "avatar"
        ? await uploadAvatar(file)
        : await uploadCover(file);

    // Backend returns saved profile
    const updatedProfile =
      response.profile || response;

    // Set actual backend URL
    if (updatedProfile.avatar) {
      setAvatarPreview(updatedProfile.avatar);
    }

    if (updatedProfile.cover_image) {
      setCoverPreview(updatedProfile.cover_image);
    }

    // Sync localStorage user
    const oldUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...oldUser,
        ...updatedProfile,
      })
    );

    setSaved(true);

    // Clear input so same file can be selected again
    event.target.value = "";
  } catch (err) {
    console.error(
      `${type} upload failed:`,
      err
    );

    // Restore previous backend image if upload fails
    try {
      const profile = await getProfile();

      if (type === "avatar") {
        setAvatarPreview(profile.avatar || "");
      } else {
        setCoverPreview(profile.cover_image || "");
      }
    } catch (reloadError) {
      console.error(
        "Failed to restore profile image:",
        reloadError
      );
    }

    setError(
      err.response?.data?.detail ||
        `Failed to upload ${type}. Please try again.`
    );

    event.target.value = "";
  }
};

  // ======================================================
  // SAVE PROFILE - BACKEND
  // ======================================================

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSaved(false);

      const profileData = {
        first_name:
          form.firstName.trim() || null,

        last_name:
          form.lastName.trim() || null,

        username:
          form.username.trim() || null,

        country:
          form.country || null,

        location:
          form.location.trim() || null,

        website:
          form.website.trim() || null,

        bio:
          form.bio.trim() || null,
      };

      const updatedProfile =
        await updateProfile(
          profileData
        );

      const updatedForm = {
        username:
          updatedProfile.username || "",

        firstName:
          updatedProfile.first_name || "",

        lastName:
          updatedProfile.last_name || "",

        email:
          updatedProfile.email || "",

        country:
          updatedProfile.country ||
          "India",

        location:
          updatedProfile.location || "",

        website:
          updatedProfile.website || "",

        bio:
          updatedProfile.bio || "",
      };

      setForm(updatedForm);

      setNewEmail(
        updatedProfile.email || ""
      );

      // Update localStorage session user
      const oldUser = JSON.parse(
        localStorage.getItem("user") ||
          "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          ...updatedProfile,
        })
      );

      setSaved(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(
        "Profile update failed:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // PASSWORD FORM CHANGE
  // ======================================================

  const handlePasswordChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // PASSWORD SUBMIT - BACKEND
  // ======================================================

  const handlePasswordSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert(
        "Please fill all password fields."
      );

      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      alert(
        "New password and confirm password do not match."
      );

      return;
    }

    if (
      passwordForm.newPassword.length < 6
    ) {
      alert(
        "New password must contain at least 6 characters."
      );

      return;
    }

    try {
      setPasswordSaving(true);

      const response =
        await changePassword({
          current_password:
            passwordForm.currentPassword,

          new_password:
            passwordForm.newPassword,
        });

      alert(
        response.message ||
          "Password changed successfully."
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(
        "Password change failed:",
        err
      );

      alert(
        err.response?.data?.detail ||
          "Failed to change password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  // ======================================================
  // EMAIL CHANGE
  // ======================================================

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!newEmail.trim()) {
      alert(
        "Please enter your new email."
      );

      return;
    }

    alert(
      "Email verification backend will be connected separately."
    );
  };

  // ======================================================
  // DISPLAY NAME
  // ======================================================

  const displayName =
    `${form.firstName} ${form.lastName}`.trim() ||
    "Creator";

  const avatarLetter = displayName
    .charAt(0)
    .toUpperCase();

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="profile-page">
        <div
          className="profile-card"
          style={{
            padding: "50px",
            textAlign: "center",
          }}
        >
          <p>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="profile-page">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="profile-page-heading">

        <div>
          <span className="profile-eyebrow">
            ACCOUNT SETTINGS
          </span>

          <h2>My Profile</h2>

          <p>
            Manage your personal information,
            profile, security and account
            settings.
          </p>
        </div>

      </div>

      {/* ==================================================
          ERROR MESSAGE
      ================================================== */}

      {error && (
        <div
          className="profile-success"
          style={{
            background: "#fff1f2",
            color: "#b91c1c",
          }}
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* ==================================================
          SUCCESS MESSAGE
      ================================================== */}

      {saved && (
        <div className="profile-success">

          <FaCheckCircle />

          <span>
            Profile information saved
            successfully.
          </span>

          <button
            type="button"
            onClick={() =>
              setSaved(false)
            }
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* ==================================================
          PROFILE HERO
      ================================================== */}

      <div className="profile-card profile-hero-card">

        {/* COVER */}

        <div
          className={`profile-cover ${
            coverPreview
              ? "has-image"
              : ""
          }`}
          style={
            coverPreview
              ? {
                  backgroundImage:
                    `url(${coverPreview})`,
                }
              : {}
          }
        >

          <div className="cover-overlay" />

          <button
            type="button"
            className="cover-upload-btn"
            onClick={() =>
              coverInputRef.current?.click()
            }
          >
            <FaCamera />

            <span>
              {coverPreview
                ? "Change cover"
                : "Add cover"}
            </span>
          </button>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              handleImageUpload(
                e,
                "cover"
              )
            }
          />

        </div>

        {/* PROFILE INFO */}

        <div className="profile-hero-content">

          <div className="profile-avatar-wrapper">

            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="profile-avatar-image"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {avatarLetter}
              </div>
            )}

            <button
              type="button"
              className="avatar-camera-btn"
              onClick={() =>
                avatarInputRef.current?.click()
              }
            >
              <FaCamera />
            </button>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                handleImageUpload(
                  e,
                  "avatar"
                )
              }
            />

          </div>

          <div className="profile-hero-details">

            <div className="profile-name-row">

              <h1>{displayName}</h1>

              <span className="profile-role-badge">
                <FaCheckCircle />
                Creator
              </span>

            </div>

            <p className="profile-username">
              {form.username
                ? `@${form.username}`
                : "@yourusername"}
            </p>

            <p className="profile-bio-preview">
              {form.bio ||
                "Add a short professional bio to introduce yourself to the BlogHub community."}
            </p>

            <div className="profile-meta">

              {form.location && (
                <span>
                  <FaMapMarkerAlt />
                  {form.location}
                </span>
              )}

              {form.country && (
                <span>
                  <FaGlobe />
                  {form.country}
                </span>
              )}

              {form.website && (
                <span>
                  <FaLink />
                  {form.website}
                </span>
              )}

            </div>

          </div>

          <div className="profile-hero-action">

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(
                    "profile-information"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <FaEdit />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================
          PROFILE INFORMATION
      ================================================== */}

      <form
        className="profile-card"
        id="profile-information"
        onSubmit={
          handleSaveProfile
        }
      >

        <div className="profile-section-header">

          <div>
            <h3>
              Personal Information
            </h3>

            <p>
              Keep your profile
              information up to date.
            </p>
          </div>

          <div className="section-icon">
            <FaUser />
          </div>

        </div>

        <div className="profile-form-grid">

          {/* FIRST NAME */}

          <div className="profile-field">

            <label>
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />

          </div>

          {/* LAST NAME */}

          <div className="profile-field">

            <label>
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />

          </div>

          {/* USERNAME */}

          <div className="profile-field">

            <label>
              Username
            </label>

            <div className="input-with-prefix">

              <span>@</span>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="username"
              />

            </div>

            <small>
              Your unique BlogHub
              username.
            </small>

          </div>

          {/* EMAIL */}

          <div className="profile-field">

            <label>
              Email Address
            </label>

            <div className="input-icon-wrapper">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
              />

              <span className="verified-badge">
                <FaCheckCircle />
              </span>

            </div>

            <small>
              Email changes require
              verification.
            </small>

          </div>

          {/* COUNTRY */}

          <div className="profile-field">

            <label>
              Country
            </label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
            >
              {countries.map(
                (country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                )
              )}
            </select>

          </div>

          {/* LOCATION */}

          <div className="profile-field">

            <label>
              Location
            </label>

            <div className="input-icon-wrapper">

              <FaMapMarkerAlt />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City, State"
              />

            </div>

          </div>

          {/* WEBSITE */}

          <div className="profile-field full-width">

            <label>
              Website
            </label>

            <div className="input-icon-wrapper">

              <FaLink />

              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />

            </div>

          </div>

          {/* BIO */}

          <div className="profile-field full-width">

            <div className="label-row">

              <label>
                Bio
              </label>

              <span>
                {form.bio.length}/200
              </span>

            </div>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              maxLength={200}
              rows="5"
              placeholder="Tell readers a little about yourself, your expertise and what you write about..."
            />

            <small>
              Keep it short and professional.
              Maximum 200 characters.
            </small>

          </div>

        </div>

        <div className="profile-form-footer">

          <span>
            <FaShieldAlt />
            Your information is private
            and secure.
          </span>

          <button
            type="submit"
            className="profile-save-btn"
            disabled={saving}
          >
            <FaSave />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

      {/* ==================================================
          EMAIL CHANGE
      ================================================== */}

      <div className="profile-card security-card">

        <div className="profile-section-header">

          <div>
            <h3>
              Change Email Address
            </h3>

            <p>
              Update the email address
              associated with your account.
            </p>
          </div>

          <div className="section-icon">
            <FaEnvelope />
          </div>

        </div>

        <div className="security-current-email">

          <div className="security-icon">
            <FaEnvelope />
          </div>

          <div>
            <span>
              Current Email
            </span>

            <strong>
              {form.email ||
                "No email available"}
            </strong>
          </div>

          <span className="security-verified">
            <FaCheckCircle />
            Verified
          </span>

        </div>

        {!showEmailSection ? (
          <button
            type="button"
            className="outline-action-btn"
            onClick={() =>
              setShowEmailSection(
                true
              )
            }
          >
            <FaEdit />
            Change Email
          </button>
        ) : (
          <form
            className="inline-security-form"
            onSubmit={
              handleEmailSubmit
            }
          >

            <div className="profile-field">

              <label>
                New Email Address
              </label>

              <input
                type="email"
                value={newEmail}
                onChange={(e) =>
                  setNewEmail(
                    e.target.value
                  )
                }
                placeholder="Enter new email address"
                required
              />

            </div>

            <div className="email-verification-note">

              <FaShieldAlt />

              <span>
                A verification link will
                be sent to your new email
                address. Email verification
                backend will be connected
                separately.
              </span>

            </div>

            <div className="security-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setShowEmailSection(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-btn"
              >
                <FaEnvelope />
                Send Verification Email
              </button>

            </div>

          </form>
        )}

      </div>

      {/* ==================================================
          CHANGE PASSWORD
      ================================================== */}

      <form
        className="profile-card security-card"
        onSubmit={
          handlePasswordSubmit
        }
      >

        <div className="profile-section-header">

          <div>
            <h3>
              Change Password
            </h3>

            <p>
              Use a strong password to
              keep your account secure.
            </p>
          </div>

          <div className="section-icon">
            <FaLock />
          </div>

        </div>

        <div className="password-grid">

          <div className="profile-field">

            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={
                passwordForm.currentPassword
              }
              onChange={
                handlePasswordChange
              }
              placeholder="Enter current password"
            />

          </div>

          <div className="profile-field">

            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={
                passwordForm.newPassword
              }
              onChange={
                handlePasswordChange
              }
              placeholder="Enter new password"
            />

          </div>

          <div className="profile-field">

            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                passwordForm.confirmPassword
              }
              onChange={
                handlePasswordChange
              }
              placeholder="Confirm new password"
            />

          </div>

        </div>

        <div className="password-hint">

          <FaKey />

          <div>

            <strong>
              Password security
            </strong>

            <p>
              We recommend using at least
              8 characters with a combination
              of letters, numbers and symbols.
            </p>

          </div>

        </div>

        <div className="security-actions">

          <button
            type="submit"
            className="profile-save-btn"
            disabled={passwordSaving}
          >
            <FaLock />

            {passwordSaving
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </form>

      {/* ==================================================
          ACCOUNT INFORMATION
      ================================================== */}

      <div className="profile-card account-info-card">

        <div className="profile-section-header">

          <div>
            <h3>
              Account Information
            </h3>

            <p>
              Basic information about your
              BlogHub account.
            </p>
          </div>

          <div className="section-icon">
            <FaShieldAlt />
          </div>

        </div>

        <div className="account-info-grid">

          <div className="account-info-item">

            <span>
              Account Type
            </span>

            <strong>
              Creator Account
            </strong>

          </div>

          <div className="account-info-item">

            <span>
              Account Status
            </span>

            <strong className="active-status">

              <FaCheckCircle />

              {form.email
                ? "Active"
                : "Active"}

            </strong>

          </div>

          <div className="account-info-item">

            <span>
              Role
            </span>

            <strong>
              User
            </strong>

          </div>

          <div className="account-info-item">

            <span>
              Profile
            </span>

            <strong>
              Public Creator Profile
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;

