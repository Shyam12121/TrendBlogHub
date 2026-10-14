import Lottie from "lottie-react";
import errorAnimation from "./404-animation.json"; // Lottie se download karke

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-inner">
        <div style={{ width: "280px", margin: "0 auto" }}>
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