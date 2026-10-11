import "./Footer.css";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaQuora,
  FaRedditAlien,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* ==========================================
          TOP STRIP
      ========================================== */}

      <div className="footer-top">
        <p>🚀 Grow your brand with BlogHub</p>
      </div>

      <div className="container">

        <div className="footer-grid">

          {/* ==========================================
              ABOUT
          ========================================== */}

          <div className="footer-about">

            <h2 className="footer-logo">
              INDI<span>BLOG</span>HUB.
            </h2>

            <p>
              IndiBlogHub is an AI-powered content publishing platform helping
              creators, businesses and brands publish SEO-friendly articles
              with maximum online visibility.
            </p>

            <a href="mailto:support@indibloghub.com">
              <FaEnvelope />
              support@indibloghub.com
            </a>

            <div className="footer-social">

           <a
  href="https://www.facebook.com/people/Trend-Blog-Hub/61595346508708/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
>
  <FaFacebookF />
</a>

<a
  href="https://www.instagram.com/trendbloghub/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
>
  <FaInstagram />
</a>

<a
  href="https://www.quora.com/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Quora"
>
  <FaQuora />
</a>

<a
  href="https://www.reddit.com/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Reddit"
>
  <FaRedditAlien />
</a>

            </div>

          </div>

          {/* ==========================================
              CATEGORIES
          ========================================== */}

          <div>

            <h3>Categories</h3>

            <ul>

              {/* Technology & AI */}
              <li>
                <Link to="/category/technology-ai">
                  <FaChevronRight />
                  Technology & AI
                </Link>
              </li>

              {/* Digital Marketing */}
              <li>
                <Link to="/category/digital-marketing">
                  <FaChevronRight />
                  Digital Marketing
                </Link>
              </li>

              {/* Health & Wellness */}
              <li>
                <Link to="/category/health-wellness">
                  <FaChevronRight />
                  Health & Wellness
                </Link>
              </li>

              {/* Travel & Lifestyle */}
              <li>
                <Link to="/category/travel-lifestyle">
                  <FaChevronRight />
                  Travel & Lifestyle
                </Link>
              </li>

              {/* Education & Career */}
              <li>
                <Link to="/category/education-career">
                  <FaChevronRight />
                  Education & Career
                </Link>
              </li>

              {/* Business & Finance */}
              <li>
                <Link to="/category/business-finance">
                  <FaChevronRight />
                  Business & Finance
                </Link>
              </li>

              {/* Programming & Dev */}
              <li>
                <Link to="/category/programming-dev">
                  <FaChevronRight />
                  Programming & Dev
                </Link>
              </li>

            </ul>

          </div>

          {/* ==========================================
              QUICK LINKS
          ========================================== */}

          <div>

            <h3>Quick Links</h3>

            <ul>

              <li>
                <Link to="/categories">
                  <FaChevronRight />
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/publications">
                  <FaChevronRight />
                  Publications
                </Link>
              </li>

              <li>
                <Link to="/about-us">
                  <FaChevronRight />
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact-us">
                  <FaChevronRight />
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/privacy-policy">
                  <FaChevronRight />
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms">
                  <FaChevronRight />
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* ==========================================
            FOOTER BOTTOM
        ========================================== */}

        <div className="footer-bottom">

          <p>
            © 2026 <span>IndiBlogHub</span>. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;