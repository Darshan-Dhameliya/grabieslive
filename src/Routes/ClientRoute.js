import React from "react";
import { Route, Navigate } from "react-router-dom";
import SignUpPage from "../pages/Common/SignUp";
import ForgetPass from "../pages/Common/ForgetPass";
import Navbar from "../pages/Common/Navbar";
import ChangePassword from "../pages/Common/ChangePassword";
import Stepper from "../pages/Client/Stepper";
import ServiceList from "../pages/Client/ServiceList";
import Cienthomepage from "../pages/Client/Cienthomepage";
import LoginPage from "../pages/Common/LoginPage";
import BookedService from "../pages/Client/BookedService";
import CompletedServide from "../pages/Client/CompletedServide";

export const ClientRoute = () => {
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
        path="/client/bookedservice"
        element={
          <>
            <Navbar />
            <BookedService />
          </>
        }
      />

      <Route
        path="/client/completedservice"
        element={
          <>
            <Navbar />
            <CompletedServide />
          </>
        }
      />

      <Route
        path="client/ChangePassword"
        element={
          <>
            <Navbar />
            <ChangePassword />
          </>
        }
      />
      <Route
        path="client/homepage/cart/fillform"
        element={
          <>
            <Navbar />
            <div className="container">
              <Stepper />
            </div>
          </>
        }
      />
      {/* <Route
        path="client/homepage/cart"
        element={
          <>
            <Navbar />
            <CartPage />
          </>
        }
      /> */}
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

      <Route path="/" element={<Navigate replace to="/client/homepage" />} />

      <Route
        path="/forgetpassword"
        element={
          <>
            <Navbar />
            <ForgetPass />
          </>
        }
      />
    </>
  );
};
