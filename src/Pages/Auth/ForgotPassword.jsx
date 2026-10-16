import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import "./ResetPassword.css";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!API_URL) {
      setError("API URL is not configured. Add VITE_API_URL to the .env file.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/auth/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // Pass email to next step
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      console.error("Forgot password error:", err);
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page forgot-page">
      <div className="auth-container">
        <Link to="/login" className="auth-back">
          ← Back to Login
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Forgot Password?</h1>
            <p>Enter your email and we&apos;ll send you a 6-digit OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="forgot-email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" aria-hidden="true" />
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {error && (
              <span className="form-error" role="alert">
                {error}
              </span>
            )}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Remember your password?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;