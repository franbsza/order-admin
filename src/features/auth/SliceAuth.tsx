import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    token: "",
    isLoading: false,
    userDetails: null,
    isAuthenticated: false,
    roles: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        }
    }
});

export const { setAuthenticated, setIsLoading, setUserDetails, setToken, setRoles } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;