import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Jab tak authentication state load ho raha hai, ek loader dikhayein
    return <div>Loading...</div>;
  }

  // Agar user authenticated nahi hai toh login page par redirect karein
  if (!user) {
    return <Navigate to="/" />;
  }

  // Agar user authenticated hai toh content render karein
  return children;
};

export default ProtectedRoute;
