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

  const roles =  JSON.parse(localStorage.getItem("roles") || "");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

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