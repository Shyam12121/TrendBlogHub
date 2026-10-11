
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// ==========================================
// API URL
// ==========================================

// const API_URL =
//     window.location.hostname === "localhost" ||
//     window.location.hostname === "127.0.0.1"
//         ? "http://127.0.0.1:8000"
//         : "http://192.168.29.233:8000";

// ==========================================
// TOKEN
// ==========================================

const getToken = () => {
    return localStorage.getItem("access_token");
};

// ==========================================
// AXIOS INSTANCE
// ==========================================

const adminApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

adminApi.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ==========================================
        // IMPORTANT:
        // File uploads must use multipart/form-data.
        // Do NOT keep application/json for FormData.
        // Browser/Axios will automatically add the
        // multipart boundary.
        // ==========================================

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
            delete config.headers["content-type"];
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// ======================================================
// AUTH
// ======================================================

// GET CURRENT LOGGED-IN USER

export const getMe = async () => {
    const response = await adminApi.get("/auth/me");

    return response.data;
};

// LOGOUT

export const logoutUser = async () => {
    try {
        const response = await adminApi.post("/auth/logout");

        return response.data;
    } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    }
};

// ======================================================
// USER PROFILE
// ======================================================

// GET CURRENT USER PROFILE
// Backend: GET /profile/me

export const getProfile = async () => {
    const response = await adminApi.get("/profile/me");

    return response.data;
};

// UPDATE CURRENT USER PROFILE
// Backend: PUT /profile

export const updateProfile = async (profileData) => {
    const response = await adminApi.put(
        "/profile",
        profileData
    );

    return response.data;
};

// CHANGE PASSWORD
// Backend: PUT /profile/password

export const changePassword = async (passwordData) => {
    const response = await adminApi.put(
        "/profile/password",
        passwordData
    );

    return response.data;
};

// ======================================================
// PROFILE IMAGE UPLOAD
// ======================================================

// UPLOAD AVATAR
// Backend: POST /profile/avatar

export const uploadAvatar = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await adminApi.post(
        "/profile/avatar",
        formData
    );

    return response.data;
};

// UPLOAD COVER IMAGE
// Backend: POST /profile/cover

export const uploadCover = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await adminApi.post(
        "/profile/cover",
        formData
    );

    return response.data;
};

// ======================================================
// PUBLIC PROFILE DIRECTORY
// ======================================================

// GET ALL ACTIVE PUBLIC AUTHORS
// Backend: GET /profile

export const getPublicProfiles = async () => {
    const response = await adminApi.get("/profile");

    return response.data;
};

// ======================================================
// SINGLE PUBLIC AUTHOR PROFILE
// ======================================================

// GET PUBLIC PROFILE BY USERNAME
// Backend: GET /profile/public/{username}

export const getPublicProfile = async (username) => {
    const response = await adminApi.get(
        `/profile/public/${encodeURIComponent(username)}`
    );

    return response.data;
};

// ======================================================
// ADMIN DASHBOARD
// ======================================================

// GET ADMIN DASHBOARD

export const getAdminDashboard = async () => {
    const response = await adminApi.get(
        "/admin/dashboard"
    );

    return response.data;
};

// ======================================================
// ADMIN USERS
// ======================================================

// GET ALL USERS

export const getAdminUsers = async () => {
    const response = await adminApi.get(
        "/admin/users"
    );

    return response.data;
};

// GET SINGLE USER

export const getAdminUser = async (userId) => {
    const response = await adminApi.get(
        `/admin/users/${userId}`
    );

    return response.data;
};

// UPDATE USER ROLE

export const updateUserRole = async (
    userId,
    role
) => {
    const response = await adminApi.patch(
        `/admin/users/${userId}/role`,
        {
            role,
        }
    );

    return response.data;
};

// UPDATE USER STATUS

export const updateUserStatus = async (
    userId,
    isActive
) => {
    const response = await adminApi.patch(
        `/admin/users/${userId}/status`,
        {
            is_active: isActive,
        }
    );

    return response.data;
};

// ======================================================
// ADMIN BLOGS
// ======================================================

// GET ALL ADMIN BLOGS

export const getAdminBlogs = async () => {
    const response = await adminApi.get(
        "/admin/blogs"
    );

    return response.data;
};

// GET SINGLE ADMIN BLOG

export const getAdminBlog = async (blogId) => {
    const response = await adminApi.get(
        `/admin/blogs/${blogId}`
    );

    return response.data;
};

// UPDATE BLOG STATUS

export const updateBlogStatus = async (
    blogId,
    status
) => {
    const response = await adminApi.patch(
        `/admin/blogs/${blogId}/status`,
        {
            status,
        }
    );

    return response.data;
};

// DELETE ADMIN BLOG

export const deleteAdminBlog = async (blogId) => {
    const response = await adminApi.delete(
        `/admin/blogs/${blogId}`
    );

    return response.data;
};

// ======================================================
// BLOG CRUD
// ======================================================

// CREATE BLOG

export const createBlog = async (blogData) => {
    const response = await adminApi.post(
        "/blogs",
        blogData
    );

    return response.data;
};

// UPDATE BLOG

export const updateBlog = async (
    blogId,
    blogData
) => {
    const response = await adminApi.patch(
        `/blogs/${blogId}`,
        blogData
    );

    return response.data;
};

// DELETE BLOG

export const deleteBlog = async (blogId) => {
    const response = await adminApi.delete(
        `/blogs/${blogId}`
    );

    return response.data;
};

// ======================================================
// USER BLOGS
// ======================================================

// GET LOGGED-IN USER BLOGS

export const getMyBlogs = async () => {
    const response = await adminApi.get(
        "/blogs/my"
    );

    return response.data;
};

// GET LOGGED-IN USER BLOG

export const getMyBlog = async (blogId) => {
    const response = await adminApi.get(
        `/blogs/my/${blogId}`
    );

    return response.data;
};

// CREATE USER BLOG

export const createMyBlog = async (blogData) => {
    const response = await adminApi.post(
        "/blogs",
        blogData
    );

    return response.data;
};

// UPDATE USER BLOG

export const updateMyBlog = async (
    blogId,
    blogData
) => {
    const response = await adminApi.patch(
        `/blogs/${blogId}`,
        blogData
    );

    return response.data;
};

// DELETE USER BLOG

export const deleteMyBlog = async (blogId) => {
    const response = await adminApi.delete(
        `/blogs/${blogId}`
    );

    return response.data;
};

// ======================================================
// PUBLIC BLOGS
// ======================================================

// GET ALL PUBLIC BLOGS

export const getPublicBlogs = async () => {
    const response = await adminApi.get(
        "/blogs"
    );

    return response.data;
};

// GET PUBLIC BLOG BY ID

export const getPublicBlog = async (blogId) => {
    const response = await adminApi.get(
        `/blogs/${blogId}`
    );

    return response.data;
};

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default adminApi;

