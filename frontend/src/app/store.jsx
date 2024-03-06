import { configureStore } from "@reduxjs/toolkit";
import {
  authAPI,
  userAPI,
  roleAPI,
} from "./services";
import authReducer from "./slices/Auth.slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [roleAPI.reducerPath]: roleAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authAPI.middleware,
      userAPI.middleware,
      roleAPI.middleware,
    ]),
});

export default store;