import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";
import { userAPI } from "./UserService";
import {jwtDecode} from "jwt-decode";

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/token/",
        method: "POST",
        body: payload,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled, getCacheEntry }) {
        try {
          await queryFulfilled;

          let data = getCacheEntry().data;
          let user = jwtDecode(data.access);

          sessionStorage.setItem("access", data.access);
          sessionStorage.setItem("id", user.user_id);
          sessionStorage.setItem("username", JSON.stringify(user.username));
         
          await dispatch(
            userAPI.endpoints.getUserById.initiate(user.user_id)
          );
        } catch (error) {
          sessionStorage.removeItem("access");
          stop()
        }
      },
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout/",
        method: "POST",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;

           sessionStorage.removeItem("access");
           sessionStorage.removeItem("user")
           sessionStorage.removeItem("id")
         
        } catch (error) {
          console.log(error);
           stop()
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authAPI;
