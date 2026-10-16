import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp, resetToken } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !otp) navigate("/forgot-password", { replace: true });
  }, [email, otp, navigate]);

  const validate = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include an uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include a number.";
    }
    if (password !== confirm) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/auth/reset-password`,
        {
          email,
          otp,
          reset_token: resetToken,
          new_password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Could not reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page reset-page">
      <div className="auth-container">
        <Link to="/login" className="auth-back">
          ← Back to Login
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Set New Password</h1>
            <p>Choose a strong password for your account</p>
          </div>

          {success ? (
            <div className="success-box">
              <p>✅ Password reset successfully!</p>
              <p>Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" aria-hidden="true" />
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" aria-hidden="true" />
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <ul className="password-rules">
                <li className={password.length >= 8 ? "ok" : ""}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "ok" : ""}>
                  One uppercase letter
                </li>
                <li className={/[0-9]/.test(password) ? "ok" : ""}>
                  One number
                </li>
              </ul>

              {error && (
                <span className="form-error" role="alert">
                  {error}
                </span>
              )}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;