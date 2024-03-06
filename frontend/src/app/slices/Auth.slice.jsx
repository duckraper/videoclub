import { createSlice } from "@reduxjs/toolkit";
import { authAPI, userAPI } from "../services";


const initialState = {
  user_id: sessionStorage.getItem("id"),
  authenticated: sessionStorage?.getItem("access") ? true : false,
  user: JSON.parse(sessionStorage.getItem("username")),
};

console.log(initialState.user)
  
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state) => {
      state.authenticated = true;
      state.user = JSON.parse(sessionStorage.getItem("username"));
    },
    logoutState: (state) => {
      state.authenticated = false;
      state.user = null;
      state.user_id = null;
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("access");
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
