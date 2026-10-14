import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Lottie from "lottie-react";
import errorAnimation from "./404-animation.json";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">

      {/* Floating decorative dots */}
      <div className="notfound-dot dot-1"></div>
      <div className="notfound-dot dot-2"></div>
      <div className="notfound-dot dot-3"></div>
      <div className="notfound-dot dot-4"></div>

      <div className="notfound-inner">

        {/* Lottie Animation */}
        <div className="notfound-lottie">
          <Lottie animationData={errorAnimation} loop={true} />
        </div>

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