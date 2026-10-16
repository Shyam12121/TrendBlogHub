import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaKey } from "react-icons/fa";
import "./ResetPassword.css";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);

  // Redirect if no email was passed
  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    // Auto-focus next input
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(""));
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/auth/verify-otp`,
        { email, otp: code },
        { headers: { "Content-Type": "application/json" } }
      );

      // Expecting a reset_token from backend
      const resetToken = res.data.reset_token || res.data.token;

      navigate("/reset-password", {
        state: { email, otp: code, resetToken },
      });
    } catch (err) {
      console.error("OTP verify error:", err);
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setTimer(60);
    } catch (err) {
      setError("Could not resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-page otp-page">
      <div className="auth-container">
        <Link to="/forgot-password" className="auth-back">
          ← Change email
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Verify OTP</h1>
            <p>
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Enter OTP</label>
              <div className="otp-inputs" onPaste={handlePaste}>
                <FaKey className="otp-icon" aria-hidden="true" />
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    autoFocus={i === 0}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {error && (
              <span className="form-error" role="alert">
                {error}
              </span>
            )}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="resend-row">
              <span>Didn&apos;t receive the code?</span>
              <button
                type="button"
                className="resend-btn"
                onClick={handleResend}
                disabled={timer > 0 || resending}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;