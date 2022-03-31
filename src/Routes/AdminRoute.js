import React from "react";
import DashBoard from "../pages/Admin/EmpDashBoard";
import Navbar from "../pages/Common/Navbar";
import EmpLoginPage from "../pages/Emp/EmpLoginPage";
import AdminHomepage from "../pages/Admin/AdminHome";
import { Route, Navigate } from "react-router-dom";

export const AdminRoute = () => {
  return (
    <>
      <Route
        path="admin/homepage"
        element={
          <>
            <AdminHomepage />
          </>
        }
      />
      <Route
        path="admin/homepage/dashBoard"
        element={
          <>
            <DashBoard />
          </>
        }
      />

      <Route
        path="emp/login"
        element={
          <>
            <EmpLoginPage />
          </>
        }
      />
    </>
  );
};
