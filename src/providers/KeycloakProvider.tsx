import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import keycloak from "../config/keycloak";

import {
    setAuthenticated,
    setIsLoading,
    setRoles,
    setToken,
    setUserDetails,
  } from "../features/auth/SliceAuth";
  
  export const KeycloakProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      const updateToken = (refresh = false) => {
        if (refresh) {
            keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              localStorage.setItem("token", JSON.stringify(keycloak.token));
              dispatch(setToken(keycloak.token));
            }
          });
        }
      };
  
      keycloak.onTokenExpired = () => {
        localStorage.removeItem("token");
        updateToken(true);
      };
  
      const initKeycloak = async () => {
        try {
          const authenticated = await keycloak.init({ onLoad: "login-required" });
          if (authenticated) {
            dispatch(setAuthenticated(true));
            dispatch(setToken(keycloak.token));
            const userInfo = await keycloak.loadUserInfo();
            dispatch(setUserDetails(userInfo));
            var roles = keycloak.realmAccess?.roles;
            dispatch(setRoles(roles));

            localStorage.setItem("user", JSON.stringify(userInfo));
            localStorage.setItem("token", JSON.stringify(keycloak.token));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            localStorage.setItem("roles", JSON.stringify(roles));

          } else {
            dispatch(setAuthenticated(false));
          }
          dispatch(setIsLoading(false));
        } catch (error) {
          dispatch(setIsLoading(false));
          console.error("Keycloak initialization error", error);
        }
      };
  
      initKeycloak();
    }, [dispatch]);
  
    return <>{children}</>;
  };
