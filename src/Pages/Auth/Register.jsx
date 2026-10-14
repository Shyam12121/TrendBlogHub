import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

// const API_URL =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1"
//     ? "http://127.0.0.1:8000"
//     : "http://192.168.29.233:8000";
const API_URL = import.meta.env.VITE_API_URL;
const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          name: fullName,
          username: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      

      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.detail) {
        setFormError(error.response.data.detail);
      } else {
        setFormError(
          "Unable to connect to server. Please make sure backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">

        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

        <div className="auth-card">

          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Start publishing and sharing your ideas</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Username</label>

              <div className="input-wrapper">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <FaLock className="input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="terms-check">
                <input type="checkbox" required />

                I agree to the{" "}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="terms-link">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {formError && (
              <div className="form-error">
                {formError}
              </div>
            )}

            {successMessage && (
              <div
                style={{
                  color: "#16a34a",
                  background: "#f0fdf4",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;