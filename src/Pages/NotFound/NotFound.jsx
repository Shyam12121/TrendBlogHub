import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">

      <div className="notfound-dot dot-1"></div>
      <div className="notfound-dot dot-2"></div>
      <div className="notfound-dot dot-3"></div>
      <div className="notfound-dot dot-4"></div>

      <div className="notfound-inner">

        {/* ✅ GIF YAHAN ADD KIYA */}
        <div className="notfound-gif">
          <img src="/404.gif" alt="404 Not Found" />
        </div>

        <h1 className="notfound-code">404</h1>

        <h2 className="notfound-title">Page Not Found</h2>

        <p className="notfound-desc">
          The page you are looking for doesn't exist.
        </p>

        <Link to="/" className="notfound-btn">
          <FaHome />
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;