import React from "react";
import { Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Common/LoginPage";
import SignUpPage from "../pages/Common/SignUp";
import ForgetPass from "../pages/Common/ForgetPass";
import PageNotFound from "../pages/Common/PageNotFound";
import ServiceList from "../pages/Client/ServiceList";
import Cienthomepage from "../pages/Client/Cienthomepage";
import EmpForgetPass from "../pages/Emp/EmpForgetPass";
import EmpSignUpPage from "../pages/Emp/EmpSignup";
import Navbar from "../pages/Common/Navbar";
import EmpLoginPage from "../pages/Emp/EmpLoginPage";

export const DefaultRoute = () => {
  return (
    <>
      <Route
        path="/signup"
        element={
          <>
            <Navbar />
            <SignUpPage />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <LoginPage />
          </>
        }
      />

      <Route
        path="client/homepage/:servicename/list"
        element={
          <>
            <Navbar />
            <ServiceList />
          </>
        }
      />
      <Route
        path="client/homepage"
        element={
          <>
            <Navbar />
            <Cienthomepage />
          </>
        }
      />

      <Route
        path="/forgetpassword"
        element={
          <>
            <Navbar />
            <ForgetPass />
          </>
        }
      />

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
        path="emp/login"
        element={
          <>
            <Navbar />
            <EmpLoginPage />
          </>
        }
      />

      <Route
        path="/forgetpassword"
        element={
          <>
            <Navbar />
            <ForgetPass />
          </>
        }
      />

      <Route path="/" element={<Navigate replace to="/client/homepage" />} />

      <Route
        path="*"
        element={
          <>
            <Navbar />
            <PageNotFound />
          </>
        }
      />

      <Route
        path="emp/register"
        element={
          <>
            <Navbar />
            <EmpSignUpPage />
          </>
        }
      />
    </>
  );
};
