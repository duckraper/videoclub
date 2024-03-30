import { configureStore } from "@reduxjs/toolkit";
import {
  authAPI,
  userAPI,
  clientsAPI,
  filmsAPI,
  supportAPI,
  rentsAPI,
} from "./services";
import authReducer from "./slices/Auth.slice";
import tipoActivoReducer from "./slices/TipoActivo.slice";

const store = configureStore({
  reducer: {
    tipo: tipoActivoReducer,
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [clientsAPI.reducerPath]: clientsAPI.reducer,
    [filmsAPI.reducerPath]: filmsAPI.reducer,
    [supportAPI.reducerPath]: supportAPI.reducer,
    [rentsAPI.reducerPath]: rentsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authAPI.middleware,
      userAPI.middleware,
      clientsAPI.middleware,
      filmsAPI.middleware,
      supportAPI.middleware,
      rentsAPI.middleware,
    ]),
});

export default store;
