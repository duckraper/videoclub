import { configureStore } from "@reduxjs/toolkit";
import {
  authAPI,
  userAPI,
  roleAPI,
  clientsAPI,
  filmsAPI,
  supportAPI
} from "./services";
import authReducer from "./slices/Auth.slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [roleAPI.reducerPath]: roleAPI.reducer,
    [clientsAPI.reducerPath]: clientsAPI.reducer,
    [filmsAPI.reducerPath]: filmsAPI.reducer,
    [supportAPI.reducerPath]: supportAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authAPI.middleware,
      userAPI.middleware,
      roleAPI.middleware,
      clientsAPI.middleware,
      filmsAPI.middleware,
      supportAPI.middleware,
    ]),
});

export default store;