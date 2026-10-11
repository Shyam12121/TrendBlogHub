import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaNewspaper,
  FaPlus,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPenNib,
} from "react-icons/fa";

import "./UserLayout.css";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const avatarLetter = (
    user.name || "U"
  )
    .charAt(0)
    .toUpperCase();

  return (
    <div className="user-layout">

      {/* SIDEBAR */}

      <aside
        className={`user-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="user-sidebar-logo">

          <div className="user-logo-icon">
            <FaPenNib />
          </div>

          <div>
            <h2>BlogHub</h2>
            <span>Creator Panel</span>
          </div>

          <button
            type="button"
            className="user-sidebar-close"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>

        </div>

        {/* USER */}

        <div className="user-profile-mini">

          <div className="user-avatar">
            {avatarLetter}
          </div>

          <div className="user-mini-info">

            <strong>
              {user.name || "User"}
            </strong>

            <span>
              {user.email || "Creator Account"}
            </span>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="user-nav">

          <p className="user-nav-title">
            MENU
          </p>

          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              `user-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/user/blogs"
            className={({ isActive }) =>
              `user-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <FaNewspaper />
            <span>My Blogs</span>
          </NavLink>

          <NavLink
            to="/user/blogs/create"
            className={({ isActive }) =>
              `user-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <FaPlus />
            <span>Create Blog</span>
          </NavLink>

          <p className="user-nav-title second">
            ACCOUNT
          </p>

          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `user-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <FaUser />
            <span>My Profile</span>
          </NavLink>

        </nav>

        {/* LOGOUT */}

        <div className="user-sidebar-bottom">

          <button
            type="button"
            className="user-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* OVERLAY */}

      {sidebarOpen && (
        <div
          className="user-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN */}

      <main className="user-main">

        <header className="user-topbar">

          <button
            type="button"
            className="user-menu-btn"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FaBars />
          </button>

          <div className="user-topbar-title">

            <h1>
              Creator Dashboard
            </h1>

            <p>
              Manage your blogs and profile
            </p>

          </div>

          <div className="user-topbar-user">

            <div className="user-top-avatar">
              {avatarLetter}
            </div>

            <div>

              <strong>
                {user.name || "User"}
              </strong>

              <span>
                Creator
              </span>

            </div>

          </div>

        </header>

        {/* CHILD PAGE */}

        <section className="user-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default UserLayout;