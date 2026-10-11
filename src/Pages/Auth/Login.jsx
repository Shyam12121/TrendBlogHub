import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSync,
} from "react-icons/fa";
import "./Login.css";

// Set VITE_API_URL in the frontend project's root .env file.
// Example: VITE_API_URL=http://13.203.75.61:8000
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const createCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const Login = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaError, setCaptchaError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Draw only on the canvas; this function does not update React state.
  const drawCaptcha = useCallback((text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise lines
    for (let i = 0; i < 8; i += 1) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(37, 99, 235, ${Math.random() * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < 50; i += 1) {
      ctx.fillStyle = `rgba(37, 99, 235, ${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 1,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // CAPTCHA characters
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const colors = ["#2563eb", "#4f46e5", "#7c3aed", "#0b1a33", "#1e293b"];

    for (let i = 0; i < text.length; i += 1) {
      const x = 25 + i * 28;
      const y = 28 + (Math.random() - 0.5) * 8;
      const rotation = (Math.random() - 0.5) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }, []);

  // The effect draws on canvas only; it does not call setState.
  useEffect(() => {
    drawCaptcha(captcha);
  }, [captcha, drawCaptcha]);

  const generateCaptcha = () => {
    setCaptcha(createCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setCaptchaError("");

    if (captchaInput.trim() !== captcha) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }

    if (!API_URL) {
      setFormError(
        "API URL is not configured. Add VITE_API_URL to the frontend root .env file and restart the Vite server."
      );
      console.error("Missing VITE_API_URL. Check the frontend root .env file.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data) {
        const detail = error.response.data.detail;
        setFormError(
          typeof detail === "string"
            ? detail
            : "Login failed. Please check your credentials and try again."
        );
      } else if (error.request) {
        setFormError("Unable to connect to the server. Please try again.");
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue reading and publishing</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group captcha-group">
              <label htmlFor="captcha-input">Enter the code below</label>
              <div className="captcha-wrapper">
                <canvas
                  ref={canvasRef}
                  width={180}
                  height={56}
                  className="captcha-canvas"
                  aria-label="CAPTCHA code"
                />
                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={generateCaptcha}
                  title="Refresh CAPTCHA"
                  aria-label="Refresh CAPTCHA"
                >
                  <FaSync />
                </button>
              </div>

              <div className="input-wrapper captcha-input-wrapper">
                <input
                  id="captcha-input"
                  type="text"
                  placeholder="Enter CAPTCHA code"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  maxLength={6}
                  autoComplete="off"
                  required
                />
              </div>

              {captchaError && (
                <span className="captcha-error" role="alert">
                  {captchaError}
                </span>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {formError && (
              <span className="form-error" role="alert">
                {formError}
              </span>
            )}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
