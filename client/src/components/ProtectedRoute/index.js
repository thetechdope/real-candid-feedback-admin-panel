import React from "react";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute({ ...rest }) {
  const auth = localStorage.getItem("loggedIn");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;
