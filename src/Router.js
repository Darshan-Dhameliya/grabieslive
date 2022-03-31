import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./provider/UserContext";
import { DefaultRoute } from "./Routes/DefaultRoute";
import { AdminRoute } from "./Routes/AdminRoute";
import { EmpRoute } from "./Routes/EmpRoute";
import { ClientRoute } from "./Routes/ClientRoute";
import Navbar from "./pages/Common/Navbar";
import PageNotFound from "./pages/Common/PageNotFound";
import AdminHomepage from "./pages/Admin/AdminHome";

export default function Router() {
  const { AuthState } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {AuthState.userType === "default" && DefaultRoute()}
        {AuthState.userType === "emp" && EmpRoute()}
        {AuthState.userType === "admin" && (
          <Route path="admin/*" element={<AdminHomepage />} />
        )}
        {AuthState.userType === "user" && ClientRoute()}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <PageNotFound />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
