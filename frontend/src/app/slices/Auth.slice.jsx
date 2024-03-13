import { createSlice } from "@reduxjs/toolkit";
import { authAPI, userAPI } from "../services";


const initialState = {
  user_id: localStorage.getItem("id"),
  authenticated: localStorage?.getItem("access") ? true : false,
  // user: JSON.parse(localStorage.getItem("username")),
};

  
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state) => {
      state.authenticated = true;
      // state.user = JSON.parse(localStorage.getItem("username"));
    },
    logoutState: (state) => {
      state.authenticated = false;
      state.user = null;
      state.user_id = null;
      localStorage.removeItem("username");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
  
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state) => {
      state.login = true;
    });
  },
});


export const { loginState, logoutState } = authSlice.actions;

export const auth_state = (state) => state.auth;

export default authSlice.reducer;
