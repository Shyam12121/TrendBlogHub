import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import ScrollToTop from "../components/ScrollToTop";

// MAIN WEBSITE
import Home from "../Pages/Home/Home";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import Category from "../Pages/Categories/Category";
import Search from "../Pages/Search/Search";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

// PUBLIC PROFILE
import ProfileDirectory from "../Pages/ProfileDirectory/ProfileDirectory";
import PublicProfile from "../Pages/PublicProfile/PublicProfile";

// DIRECTORY
import PopularTopics from "../Pages/Topics/PopularTopics";
import Publishers from "../Pages/Publishers/Publishers";
import Publications from "../Pages/Publications/Publications";

// AUTH
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../Pages/NotFound/NotFound";

// ADMIN
import AdminLayout from "../Pages/Admin/AdminLayout";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminBlogs from "../Pages/Admin/AdminBlogs";
import CreateBlog from "../Pages/Admin/CreateBlog";
import EditBlog from "../Pages/Admin/EditBlog";

// USER
import UserDashboard from "../Pages/User/UserDashboard/UserDashboard";
import UserCreateBlog from "../Pages/User/CreateBlog/CreateBlog";
import UserProfile from "../Pages/User/UserProfile/UserProfile";
import UserBlogs from "../Pages/User/UserBlogs/UserBlogs";
import UserEditBlog from "../Pages/User/EditBlog/EditBlog";

import Privacy from "../Pages/Privacy/Privacy";
import CategoryDirectory from "../Pages/Categories/CategoryDirectory";
import Terms from "../Pages/Terms/Terms";

// ==========================================
// APP ROUTES
// ==========================================

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        {/* =========================================
            MAIN WEBSITE — Header + Footer aayega
        ========================================= */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/profile" element={<ProfileDirectory />} />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route path="/categories" element={<CategoryDirectory />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:slug/:topic" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/topics" element={<PopularTopics />} />
          <Route path="/publishers" element={<Publishers />} />

          {/* ✅ 404 — MainLayout ke ANDAR, SABSE LAST */}
          <Route path="*" element={<NotFound />} />

        </Route>

        {/* =========================================
            AUTH — bina Header/Footer
        ========================================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 PASSWORD RESET FLOW (3 steps) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* =========================================
            ADMIN
        ========================================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/edit/:blogId" element={<EditBlog />} />

        </Route>

        {/* =========================================
            USER
        ========================================= */}

        <Route path="/user" element={<UserLayout />}>

          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="blogs" element={<UserBlogs />} />
          <Route path="blogs/create" element={<UserCreateBlog />} />
          <Route path="blogs/edit/:blogId" element={<UserEditBlog />} />
          <Route path="profile" element={<UserProfile />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;