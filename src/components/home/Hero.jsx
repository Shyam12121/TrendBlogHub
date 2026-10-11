import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaPenNib,
  FaSearch,
  FaLightbulb,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-blur blur1"></div>
      <div className="hero-blur blur2"></div>

      <div className="container hero-wrapper">
        {/* =========================
            LEFT CONTENT
        ========================= */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-badge">
            <span className="badge-dot"></span>
            Ideas • Insights • Information
          </span>

          <h1>
            Discover Ideas <span>Worth Reading</span>
          </h1>

          <p className="hero-intro">
            Explore useful information, fresh perspectives, and interesting
            stories from contributors across the web.
          </p>

          <p className="hero-description">
            TrendBlogHub is a growing publishing platform where writers,
            professionals, creators, businesses, and curious readers come
            together to share and discover useful information. From technology
            and health to business, finance, education, lifestyle, travel, and
            entertainment, our platform brings together articles covering the
            subjects people are learning about, discussing, and exploring
            today.
          </p>

          <div className="hero-buttons">
            <Link to="/publications" className="primary-btn">
              Explore Publications
              <FaArrowRight />
            </Link>

            <Link to="/login" className="secondary-btn">
              <FaPenNib />
              Start Publishing
            </Link>
          </div>
        </motion.div>

        {/* =========================
            RIGHT CONTENT
        ========================= */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="dashboard">
            <div className="dashboard-top">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>

              <span className="dashboard-title">
                TrendBlogHub Explore
              </span>
            </div>

            <div className="dashboard-heading">
              <span>Discover Something New</span>
              <small>Explore useful ideas and information</small>
            </div>

            <div className="dashboard-grid">
              <div className="card-box">
                <FaBookOpen className="icon" />
                <h4>Latest Articles</h4>
                <p>Fresh ideas to explore</p>
              </div>

              <div className="card-box">
                <FaSearch className="icon" />
                <h4>Explore Topics</h4>
                <p>Find useful information</p>
              </div>

              <div className="card-box">
                <FaUsers className="icon" />
                <h4>Different Voices</h4>
                <p>Insights from contributors</p>
              </div>

              <div className="card-box">
                <FaLightbulb className="icon" />
                <h4>New Ideas</h4>
                <p>Learn something new</p>
              </div>
            </div>
          </div>

          <motion.div
            className="floating-card one"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            📚 Fresh Ideas
          </motion.div>

          <motion.div
            className="floating-card two"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            ✨ New Perspectives
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-footer">
        <span>Ideas, Insights & Information Worth Exploring</span>
      </div>
    </section>
  );
};

export default Hero;