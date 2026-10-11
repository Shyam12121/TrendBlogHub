import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import SocialSidebar from "../components/layout/SocialSidebar/SocialSidebar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <SocialSidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;