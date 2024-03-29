import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import useAuthStore from "@/stores/auth";
import Sidebar from "../layout/Sidebar";
import ProtectedRoute from "../layout/ProtectedRoute";

const Layout = ({ children }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  if (user?.role === "admin") {
    return (
      <ProtectedRoute>
        <div className="drawer max-w-full flex flex-col">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <Navbar />
          <div className=" mt-30">{children}</div>
          <Footer />
          <Sidebar />
        </div>
      </ProtectedRoute>
    );
  } else {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className=" mt-30">{children}</div>
        <Footer />
      </ProtectedRoute>
    );
  }
};

export default Layout;
