import React from "react";
import DashBoard from "../pages/Admin/DashBoard";
import Navbar from "../pages/Common/Navbar";
import EmpLoginPage from "../pages/Emp/EmpLoginPage";
import AdminHomepage from "../pages/Admin/AdminHomepage";
import { Route, Navigate } from "react-router-dom";

export const AdminRoute = () => {
  return (
    <>
      <Route
        path="admin/homepage"
        element={
          <>
            <Navbar />
            <AdminHomepage />
          </>
        }
      />
      <Route
        path="admin/homepage/dashBoard"
        element={
          <>
            <Navbar />
            <DashBoard />
          </>
        }
      />

      <Route path="/" element={<Navigate replace to="/admin/homepage" />} />
      <Route
        path="emp/login"
        element={
          <>
            <Navbar />
            <EmpLoginPage />
          </>
        }
      />
    </>
  );
};
