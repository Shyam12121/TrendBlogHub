import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        background: "#ffffff",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(80px, 12vw, 130px)",
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "-4px",
            background:
              "linear-gradient(135deg, #4d6eff 0%, #7c8cff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <h2
          style={{
            margin: "20px 0 12px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#172033",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            margin: "0 0 30px",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#687286",
          }}
        >
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 22px",
            background: "#4d6eff",
            color: "#ffffff",
            borderRadius: "9px",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3f5ee5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4d6eff")}
        >
          <FaHome />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;