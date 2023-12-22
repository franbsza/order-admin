import React from "react";
import { AccessDenied } from "../features/auth/AccessDenied";
import {
  selectIsAuthenticated,
  selectRoles
} from "../features/auth/SliceAuth";
import { useAppSelector } from "../app/hooks";
import { Home } from "./Home";

export const ProtectedRoutes = ({
  children,
  rolesParam,
}: {
  children: React.ReactNode;
  rolesParam: Array<string>;
}) => {
  const location = window.location;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const roles = useAppSelector(selectRoles);
  let rolePermitted = false;

  if(roles){
    roles.forEach(function(role){ 
      rolesParam.forEach(function(roleParam){
        if(role === roleParam){
          rolePermitted = true;
          return true;
        };
      });
    });  
  }

  const isPermitted = isAuthenticated && rolePermitted ? true : false;

  if (!isPermitted) {
    if(location.pathname === '/customers'){
      return <Home/> ;
    }
    return <AccessDenied />;
  }
  return <>{children}</>;
};