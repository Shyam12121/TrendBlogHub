import "./SocialSidebar.css";

import {
  FaFacebookF,
  FaInstagram,
  FaQuora,
  FaRedditAlien,
} from "react-icons/fa";

const SocialSidebar = () => {
  return (
    <div className="social-sidebar">

      <div className="share-count">
        <h3>2.3K</h3>
        <span>Shares</span>
      </div>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/people/Trend-Blog-Hub/61595346508708/"
        target="_blank"
        rel="noopener noreferrer"
        className="facebook"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/trendbloghub/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>

      {/* Quora */}
      <a
        href="https://www.quora.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="quora"
        aria-label="Quora"
      >
        <FaQuora />
      </a>

      {/* Reddit */}
      <a
        href="https://www.reddit.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="reddit"
        aria-label="Reddit"
      >
        <FaRedditAlien />
      </a>

    </div>
  );
};

export default SocialSidebar;