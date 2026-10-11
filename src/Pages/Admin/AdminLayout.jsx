import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaNewspaper,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserShield,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

import "./AdminLayout.css";


const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // SIDEBAR STATES
  // ==========================================

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [managementOpen, setManagementOpen] =
    useState(true);


  // ==========================================
  // CLOSE MOBILE SIDEBAR ON ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);


  // ==========================================
  // MANAGEMENT ACTIVE
  // ==========================================

  const managementActive =
    location.pathname.startsWith("/admin/users") ||
    location.pathname.startsWith("/admin/blogs");


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("access_token");

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };


  // ==========================================
  // NAVIGATION
  // ==========================================

  const goToDashboard = () => {
    navigate("/admin");
  };


  return (
    <div
      className={`admin-layout ${
        sidebarCollapsed
          ? "sidebar-collapsed"
          : ""
      } ${
        mobileOpen
          ? "mobile-sidebar-open"
          : ""
      }`}
    >

      {/* ========================================
          MOBILE OVERLAY
      ======================================== */}

      {mobileOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}


      {/* ========================================
          SIDEBAR
      ======================================== */}

      <aside className="admin-sidebar">

        {/* ======================================
            LOGO
        ====================================== */}

        <div className="admin-logo">

          <div
            className="admin-logo-mark"
            onClick={goToDashboard}
          >
            B
          </div>

          <div className="admin-logo-text">

            <strong>
              BlogAdmin
            </strong>

            <span>
              Management Panel
            </span>

          </div>


          {/* MOBILE CLOSE */}

          <button
            className="admin-mobile-close"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <FaTimes />
          </button>

        </div>


        {/* ======================================
            SIDEBAR MENU
        ====================================== */}

        <div className="admin-sidebar-content">

          <div className="admin-menu-label">
            MAIN MENU
          </div>


          {/* ====================================
              DASHBOARD
          ==================================== */}

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive
                  ? "active"
                  : ""
              }`
            }
          >

            <span className="admin-nav-icon">
              <FaTachometerAlt />
            </span>

            <span className="admin-nav-text">
              Dashboard
            </span>

          </NavLink>


          {/* ====================================
              MANAGEMENT
          ==================================== */}

          <div className="admin-management">

            <button
              className={`admin-nav-item admin-management-btn ${
                managementActive
                  ? "parent-active"
                  : ""
              }`}
              onClick={() =>
                setManagementOpen(
                  !managementOpen
                )
              }
            >

              <span className="admin-nav-icon">
                <FaUsers />
              </span>

              <span className="admin-nav-text">
                Management
              </span>

              <span className="admin-dropdown-arrow">

                {managementOpen ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}

              </span>

            </button>


            {/* ==================================
                SUB MENU
            ================================== */}

            <div
              className={`admin-submenu ${
                managementOpen
                  ? "open"
                  : ""
              }`}
            >

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `admin-submenu-item ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
              >

                <span className="submenu-line" />

                <FaUsers />

                <span>
                  Users
                </span>

              </NavLink>


              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  `admin-submenu-item ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
              >

                <span className="submenu-line" />

                <FaNewspaper />

                <span>
                  Blogs
                </span>

              </NavLink>

            </div>

          </div>


          {/* ====================================
              SYSTEM
          ==================================== */}

          <div className="admin-menu-label system-label">
            SYSTEM
          </div>


          <button
            className="admin-nav-item admin-disabled-item"
            type="button"
          >

            <span className="admin-nav-icon">
              <FaUserShield />
            </span>

            <span className="admin-nav-text">
              Admin Access
            </span>

          </button>

        </div>


        {/* ======================================
            SIDEBAR BOTTOM
        ====================================== */}

        <div className="admin-sidebar-bottom">

          {/* USER */}

          <div className="admin-profile">

            <div className="admin-profile-avatar">
              A
            </div>

            <div className="admin-profile-info">

              <strong>
                Administrator
              </strong>

              <span>
                Super Admin
              </span>

            </div>

          </div>


          {/* LOGOUT */}

          <button
            className="admin-logout"
            onClick={handleLogout}
          >

            <FaSignOutAlt />

            <span>
              Logout
            </span>

          </button>


          {/* COLLAPSE */}

          <button
            className="admin-collapse-btn"
            onClick={() =>
              setSidebarCollapsed(
                !sidebarCollapsed
              )
            }
          >

            {sidebarCollapsed ? (
              <FaAngleDoubleRight />
            ) : (
              <FaAngleDoubleLeft />
            )}

            <span>
              {sidebarCollapsed
                ? "Expand Sidebar"
                : "Collapse Sidebar"}
            </span>

          </button>

        </div>

      </aside>


      {/* ========================================
          MAIN AREA
      ======================================== */}

      <main className="admin-main">

        {/* ======================================
            TOPBAR
        ====================================== */}

        <header className="admin-topbar">

          <div className="admin-topbar-left">

            <button
              className="admin-mobile-menu"
              onClick={() =>
                setMobileOpen(true)
              }
            >
              <FaBars />
            </button>

            <div>

              <span className="admin-topbar-title">
                Admin Panel
              </span>

              <span className="admin-topbar-path">
                / {location.pathname === "/admin"
                  ? "Dashboard"
                  : location.pathname
                      .split("/")
                      .pop()}
              </span>

            </div>

          </div>


          <div className="admin-topbar-right">

            <div className="admin-online">

              <span className="online-dot" />

              Online

            </div>

            <div className="topbar-avatar">
              A
            </div>

          </div>

        </header>


        {/* ======================================
            PAGE CONTENT
        ====================================== */}

        <section className="admin-content">

          <Outlet />

        </section>

      </main>

    </div>
  );
};

export default AdminLayout;