import React from "react";
import EmpLoginPage from "../pages/Emp/EmpLoginPage";
import EmpForgetPass from "../pages/Emp/EmpForgetPass";
import EmpHomepage from "../pages/Emp/EmpHomepage";
import EmpChangePassword from "../pages/Common/ChangePassword";
import EmpSignUpPage from "../pages/Emp/EmpSignup";
import Navbar from "../pages/Common/Navbar";
import { Route, Navigate } from "react-router-dom";
import CompletedSerice from "../pages/Emp/CompletedSerice";

export const EmpRoute = () => {
  return (
    <>
      <Route
        path="emp/forgetpassword"
        element={
          <>
            <Navbar />
            <EmpForgetPass />
          </>
        }
      />

      <Route
        path="emp/completeservice"
        element={
          <>
            <Navbar />
            <CompletedSerice />
          </>
        }
      />

      <Route
        path="emp/homepage"
        element={
          <>
            <Navbar />
            <div className="container">
              <EmpHomepage />
            </div>
          </>
        }
      />
      <Route
        path="emp/ChangePassword"
        element={
          <>
            <Navbar />
            <EmpChangePassword />
          </>
        }
      />

      <Route path="/" element={<Navigate replace to="/emp/homepage" />} />

      <Route
        path="emp/register"
        element={
          <>
            <Navbar />
            <EmpSignUpPage />
          </>
        }
      />
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
