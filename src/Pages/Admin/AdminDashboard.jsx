import { useEffect, useState } from "react";

import {
  FaUsers,
  FaNewspaper,
  FaCheckCircle,
  FaClock,
  FaArrowUp,
  FaSyncAlt,
  FaChartLine,
} from "react-icons/fa";

import {
  getAdminDashboard,
} from "../../services/adminApi";

import "./AdminDashboard.css";


const AdminDashboard = () => {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getAdminDashboard();

     

      setDashboard(data);

    } catch (error) {

      console.error(
        "Dashboard API Error:",
        error
      );

      setError(
        error?.response?.data?.detail ||
        "Unable to load admin dashboard."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    loadDashboard();

  }, []);


  // ==========================================
  // SAFE VALUES
  // ==========================================

  const totalUsers =
    dashboard?.total_users ??
    dashboard?.users_count ??
    dashboard?.users ??
    0;

  const totalBlogs =
    dashboard?.total_blogs ??
    dashboard?.blogs_count ??
    dashboard?.blogs ??
    0;

  const publishedBlogs =
    dashboard?.published_blogs ??
    dashboard?.published ??
    0;

  const pendingBlogs =
    dashboard?.pending_blogs ??
    dashboard?.pending ??
    0;


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="dashboard-loading">

        <div className="dashboard-loader">
        </div>

        <h3>
          Loading Dashboard...
        </h3>

        <p>
          Fetching live data from your backend
        </p>

      </div>
    );

  }


  return (

    <div className="admin-dashboard-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>

          <div className="dashboard-breadcrumb">
            Admin Panel / Dashboard
          </div>

          <h1>
            Welcome back, Admin 👋
          </h1>

          <p>
            Here's what's happening with your
            blog platform today.
          </p>

        </div>


        <button
          className="dashboard-refresh"
          onClick={loadDashboard}
        >

          <FaSyncAlt />

          Refresh

        </button>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="dashboard-error">

          <strong>
            Dashboard API Error
          </strong>

          <span>
            {error}
          </span>

          <button
            onClick={loadDashboard}
          >
            Try Again
          </button>

        </div>

      )}


      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="dashboard-stats">

        {/* USERS */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="stat-icon purple">
              <FaUsers />
            </div>

            <div className="stat-trend">
              <FaArrowUp />
              Live
            </div>

          </div>

          <span className="stat-label">
            Total Users
          </span>

          <strong className="stat-value">
            {totalUsers}
          </strong>

          <span className="stat-description">
            Registered accounts
          </span>

        </div>


        {/* BLOGS */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="stat-icon blue">
              <FaNewspaper />
            </div>

            <div className="stat-trend">
              <FaArrowUp />
              Live
            </div>

          </div>

          <span className="stat-label">
            Total Blogs
          </span>

          <strong className="stat-value">
            {totalBlogs}
          </strong>

          <span className="stat-description">
            Blog posts
          </span>

        </div>


        {/* PUBLISHED */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="stat-icon green">
              <FaCheckCircle />
            </div>

          </div>

          <span className="stat-label">
            Published
          </span>

          <strong className="stat-value">
            {publishedBlogs}
          </strong>

          <span className="stat-description">
            Live on platform
          </span>

        </div>


        {/* PENDING */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="stat-icon orange">
              <FaClock />
            </div>

          </div>

          <span className="stat-label">
            Pending
          </span>

          <strong className="stat-value">
            {pendingBlogs}
          </strong>

          <span className="stat-description">
            Waiting for review
          </span>

        </div>

      </div>


      {/* ======================================
          LOWER SECTION
      ====================================== */}

      <div className="dashboard-grid">

        {/* OVERVIEW */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h3>
                Platform Overview
              </h3>

              <p>
                Current platform statistics
              </p>

            </div>

            <div className="panel-icon">
              <FaChartLine />
            </div>

          </div>


          <div className="overview-list">

            <div className="overview-row">

              <div className="overview-left">

                <span className="overview-dot purple-dot" />

                <span>
                  Total Users
                </span>

              </div>

              <strong>
                {totalUsers}
              </strong>

            </div>


            <div className="overview-row">

              <div className="overview-left">

                <span className="overview-dot blue-dot" />

                <span>
                  Total Blogs
                </span>

              </div>

              <strong>
                {totalBlogs}
              </strong>

            </div>


            <div className="overview-row">

              <div className="overview-left">

                <span className="overview-dot green-dot" />

                <span>
                  Published Blogs
                </span>

              </div>

              <strong>
                {publishedBlogs}
              </strong>

            </div>


            <div className="overview-row">

              <div className="overview-left">

                <span className="overview-dot orange-dot" />

                <span>
                  Pending Blogs
                </span>

              </div>

              <strong>
                {pendingBlogs}
              </strong>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h3>
                Quick Management
              </h3>

              <p>
                Manage your platform
              </p>

            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() =>
                window.location.href =
                  "/admin/users"
              }
            >

              <span className="quick-icon purple">
                <FaUsers />
              </span>

              <span>
                <strong>
                  Manage Users
                </strong>

                <small>
                  Roles & account status
                </small>
              </span>

            </button>


            <button
              onClick={() =>
                window.location.href =
                  "/admin/blogs"
              }
            >

              <span className="quick-icon blue">
                <FaNewspaper />
              </span>

              <span>
                <strong>
                  Manage Blogs
                </strong>

                <small>
                  Review & moderate posts
                </small>
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>

  );
};


export default AdminDashboard;