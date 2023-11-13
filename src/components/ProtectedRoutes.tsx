
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../app/store";

export const ProtectedRoutes = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: Array<String>;
}) => {
  let location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);
 
  if (loading) {
    return <p className="container">Checking auth..</p>;
  }
 
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
 
  if (isAuthenticated && !userHasRequiredRole) {
    console.log("User has required role", user);
   // return <AccessDenied />; // build your won access denied page (sth like 404)
  }
 
  return children;
};