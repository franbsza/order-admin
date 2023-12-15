import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AccessDenied } from "../features/auth/AccessDenied";

export const ProtectedRoutes = ({
  children,
  rolesPropos,
}: {
  children: React.ReactNode;
  rolesPropos: Array<string>;
}) => {
  let location = useLocation();
  let isAuthenticated = localStorage.getItem("isAuthenticated") ? JSON.parse(localStorage.getItem("isAuthenticated") || "") : false;
  let roles = localStorage.getItem("roles") ? JSON.parse(localStorage.getItem("roles") || "") : [];

  if(roles){
    let rolePermitted = false;
      for (var role of rolesPropos) {
         if(roles.includes(role)) {
          rolePermitted = true;
          break;
         }
      }

      const isPermitted = isAuthenticated && rolePermitted ? true : false;

      if (!isAuthenticated || !isPermitted) {
        console.log("User has required role");
        return <AccessDenied />;
      }

      if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
      }
  }

  return <>{children}</>;
};