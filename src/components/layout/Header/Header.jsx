import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaThLarge,
  FaNewspaper,
  FaSearch,
  FaPenNib,
  FaRobot,
  FaChartLine,
  FaHeartbeat,
  FaPlane,
  FaGraduationCap,
  FaDollarSign,
  FaLaptopCode,
  FaTimes,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const openSearch = () => {
    navigate("/search");
  };

  return (
    <>
      {/* ==========================================
          TOP BAR
      ========================================== */}

      <div className="topbar">
        <div className="container">
          🚀 Welcome to <strong>TrendBlogHub</strong> — Discover, Read & Publish
          Amazing Blogs
        </div>
      </div>

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="header">
        <div className="container">

          {/* ========================================
              LOGO
          ======================================== */}

          <Link to="/" className="logo">
            <img
              src="/logo.png"
              alt="TrendBlogHub"
              className="logo-img"
            />
          </Link>

          {/* ========================================
              DESKTOP NAVIGATION
          ======================================== */}

          <nav className="menu">

            {/* ======================================
                CATEGORIES DROPDOWN
            ====================================== */}

            <div className="menu-item">
              <button
                type="button"
                className="menu-btn"
                aria-label="Open Categories"
              >
                <FaThLarge />
                <span>Categories</span>
              </button>

              <div className="category-dropdown">

                {/* Technology & AI */}
                <Link to="/category/technology-ai">
                  <FaRobot />
                  Technology & AI

                  <span className="badge">
                    Trending
                  </span>
                </Link>

                {/* Digital Marketing */}
                <Link to="/category/digital-marketing">
                  <FaChartLine />
                  Digital Marketing

                  <span className="badge badge-hot">
                    Hot
                  </span>
                </Link>

                {/* Health & Wellness */}
                <Link to="/category/health-wellness">
                  <FaHeartbeat />
                  Health & Wellness
                </Link>

                {/* Travel & Lifestyle */}
                <Link to="/category/travel-lifestyle">
                  <FaPlane />
                  Travel & Lifestyle
                </Link>

                {/* Education & Career */}
                <Link to="/category/education-career">
                  <FaGraduationCap />
                  Education & Career

                  <span className="badge badge-new">
                    New
                  </span>
                </Link>

                {/* Business & Finance */}
                <Link to="/category/business-finance">
                  <FaDollarSign />
                  Business & Finance
                </Link>

                {/* Programming & Dev */}
                <Link to="/category/programming-dev">
                  <FaLaptopCode />
                  Programming & Dev
                </Link>

              </div>
            </div>

            {/* ======================================
                ABOUT US
            ====================================== */}

            <Link
              to="/about-us"
              className="menu-link"
            >
              <FaInfoCircle />
              About Us
            </Link>

            {/* ======================================
                CONTACT
            ====================================== */}

            <Link
              to="/contact-us"
              className="menu-link"
            >
              <FaEnvelope />
              Contact
            </Link>

            {/* ======================================
                PUBLICATIONS
            ====================================== */}

            <Link
              to="/publications"
              className="menu-link"
            >
              <FaNewspaper />
              Publications
            </Link>

          </nav>

          {/* ==========================================
              RIGHT MENU
          ========================================== */}

          <div className="right-menu">

            {/* ======================================
                SEARCH BUTTON
            ====================================== */}

            <button
              type="button"
              className="search-btn"
              onClick={openSearch}
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* ======================================
                START PUBLISHING
            ====================================== */}

            <Link
              to="/login"
              className="publish-btn"
            >
              <FaPenNib />
              Start Publishing
            </Link>

            {/* ======================================
                HAMBURGER
            ====================================== */}

            <button
              type="button"
              className="menu-toggle"
              onClick={toggleMobile}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>

        </div>
      </header>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      <div
        className={`mobile-menu ${
          mobileOpen ? "open" : ""
        }`}
      >

        {/* Close */}

        <button
          type="button"
          className="close-btn"
          onClick={closeMobile}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {/* ======================================
            CATEGORIES
        ====================================== */}

        <Link
          to="/category"
          onClick={closeMobile}
        >
          <FaThLarge />
          Categories
        </Link>

        {/* ======================================
            ABOUT US
        ====================================== */}

        <Link
          to="/about-us"
          onClick={closeMobile}
        >
          <FaInfoCircle />
          About Us
        </Link>

        {/* ======================================
            CONTACT
        ====================================== */}

        <Link
          to="/contact-us"
          onClick={closeMobile}
        >
          <FaEnvelope />
          Contact
        </Link>

        {/* ======================================
            PUBLICATIONS
        ====================================== */}

        <Link
          to="/publications"
          onClick={closeMobile}
        >
          <FaNewspaper />
          Publications
        </Link>

        {/* ======================================
            SEARCH
        ====================================== */}

        <Link
          to="/search"
          onClick={closeMobile}
        >
          <FaSearch />
          Search
        </Link>

        {/* ======================================
            START PUBLISHING
        ====================================== */}

        <Link
          to="/login"
          className="mobile-publish"
          onClick={closeMobile}
        >
          <FaPenNib />
          Start Publishing
        </Link>

      </div>
    </>
  );
};

export default Header;