import { useEffect, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaSyncAlt,
  FaUserShield,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
} from "react-icons/fa";

import {
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
} from "../../services/adminApi";

import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [error, setError] = useState("");

  // =========================================
  // LOAD USERS
  // =========================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminUsers();

      const userList = Array.isArray(data)
        ? data
        : data?.users || data?.data || [];

      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error) {
      console.error("Users API Error:", error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================================
  // FILTER
  // =========================================

  useEffect(() => {
    let result = [...users];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(keyword) ||
          user.email?.toLowerCase().includes(keyword)
      );
    }

    if (roleFilter !== "all") {
      result = result.filter(
        (user) => user.role === roleFilter
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((user) =>
        statusFilter === "active"
          ? user.is_active === true
          : user.is_active === false
      );
    }

    setFilteredUsers(result);
  }, [search, roleFilter, statusFilter, users]);

  // =========================================
  // ROLE UPDATE
  // =========================================

  const handleRoleChange = async (userId, role) => {
    try {
      setActionLoading(`role-${userId}`);

      const updatedUser = await updateUserRole(
        userId,
        role
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                ...(updatedUser || {}),
                role,
              }
            : user
        )
      );
    } catch (error) {
      console.error("Role update error:", error);

      alert(
        error?.response?.data?.detail ||
          "Unable to update user role."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================================
  // STATUS UPDATE
  // =========================================

  const handleStatusChange = async (
    userId,
    currentStatus
  ) => {
    const newStatus = !currentStatus;

    try {
      setActionLoading(`status-${userId}`);

      const updatedUser = await updateUserStatus(
        userId,
        newStatus
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                ...(updatedUser || {}),
                is_active: newStatus,
              }
            : user
        )
      );
    } catch (error) {
      console.error("Status update error:", error);

      alert(
        error?.response?.data?.detail ||
          "Unable to update user status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================================
  // STATS
  // =========================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.is_active === true
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.is_active === false
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loader"></div>

        <h3>Loading users...</h3>

        <p>
          Fetching users from your database
        </p>
      </div>
    );
  }

  return (
    <div className="admin-users-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="admin-users-header">

        <div>
          <div className="admin-page-breadcrumb">
            Admin Panel / Users
          </div>

          <h1>User Management</h1>

          <p>
            Manage registered users, roles and account
            status.
          </p>
        </div>

        <button
          className="admin-refresh-btn"
          onClick={loadUsers}
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>


      {/* =====================================
          STATS
      ===================================== */}

      <div className="users-stats">

        <div className="user-stat-card">

          <div className="user-stat-icon purple">
            <FaUsers />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{totalUsers}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon orange">
            <FaTimesCircle />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveUsers}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon blue">
            <FaUserShield />
          </div>

          <div>
            <span>Administrators</span>
            <strong>{adminUsers}</strong>
          </div>

        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="admin-users-error">
          {error}
        </div>
      )}


      {/* =====================================
          TABLE PANEL
      ===================================== */}

      <div className="users-table-panel">

        <div className="users-toolbar">

          <div className="users-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="users-filters">

            <div className="admin-select">

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
              >
                <option value="all">
                  All Roles
                </option>

                <option value="admin">
                  Admin
                </option>

                <option value="user">
                  User
                </option>
              </select>

              <FaChevronDown />

            </div>


            <div className="admin-select">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>


        {/* =====================================
            TABLE
        ===================================== */}

        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="users-empty"
                  >
                    <FaUsers />

                    <strong>
                      No users found
                    </strong>

                    <span>
                      Try changing your search or filters.
                    </span>
                  </td>
                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr key={user.id}>

                    {/* USER */}

                    <td>

                      <div className="user-table-profile">

                        <div className="user-avatar">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div>
                          <strong>
                            {user.name ||
                              "Unknown User"}
                          </strong>

                          <span>
                            {user.email}
                          </span>
                        </div>

                      </div>

                    </td>


                    {/* ROLE */}

                    <td>

                      <div className="role-select-wrapper">

                        {user.role === "admin" ? (
                          <FaUserShield />
                        ) : (
                          <FaUser />
                        )}

                        <select
                          value={user.role || "user"}
                          disabled={
                            actionLoading ===
                            `role-${user.id}`
                          }
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="user">
                            User
                          </option>

                          <option value="admin">
                            Admin
                          </option>
                        </select>

                        <FaChevronDown />

                      </div>

                    </td>


                    {/* STATUS */}

                    <td>

                      <button
                        className={`status-toggle ${
                          user.is_active
                            ? "active"
                            : "inactive"
                        }`}
                        disabled={
                          actionLoading ===
                          `status-${user.id}`
                        }
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.is_active
                          )
                        }
                      >

                        <span></span>

                        {user.is_active
                          ? "Active"
                          : "Inactive"}

                      </button>

                    </td>


                    {/* ID */}

                    <td>

                      <span className="user-id">
                        #{user.id}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        className={`status-action-btn ${
                          user.is_active
                            ? "disable"
                            : "enable"
                        }`}
                        disabled={
                          actionLoading ===
                          `status-${user.id}`
                        }
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.is_active
                          )
                        }
                      >
                        {user.is_active
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminUsers;