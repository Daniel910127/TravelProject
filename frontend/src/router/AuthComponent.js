import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthComponent = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  // Replace with your authentication logic or hook
  console.log("isAuth", isAuthenticated);
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default AuthComponent;
