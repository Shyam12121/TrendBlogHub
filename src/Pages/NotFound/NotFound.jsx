import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">

      <div className="notfound-inner">

        {/* FULL PAGE GIF */}
        <div className="notfound-gif">
          <img src="/404.gif" alt="404 Not Found" />
        </div>

        {/* Back Home Button */}
        <Link to="/" className="notfound-btn">
          <FaHome />
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;