import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import SEO from "../../components/SEO/SEO";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 – Page Not Found"
        description="The page you are looking for could not be found on TrendBlogHub. Return to the homepage to explore our articles and publications."
        url="/404"
        noindex={true}
      />

      <div className="notfound-page">
        <div className="notfound-inner">
          {/* GIF */}
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
    </>
  );
};

export default NotFound;