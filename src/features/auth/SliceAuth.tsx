import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    token: "",
    isLoading: false,
    userDetails: null,
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        }
    }
});

export const { setAuthenticated, setIsLoading, setUserDetails, setToken } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;