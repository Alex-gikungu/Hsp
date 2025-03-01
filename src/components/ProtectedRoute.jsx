import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from local storage

  // Check if user is logged in and has an allowed role
  if (user && allowedRoles.includes(user.role)) {
    return element; // Render the component if the user has the right role
  }

  // Redirect to unauthorized page if access is denied
  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;