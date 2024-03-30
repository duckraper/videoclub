import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";
import { userAPI } from "./UserService";
import { jwtDecode } from "jwt-decode";

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

          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("id", user.user_id);
          localStorage.setItem("username", JSON.stringify(user.username));

          await dispatch(userAPI.endpoints.getUserById.initiate(user.user_id));
        } catch (error) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
          localStorage.removeItem("id");
          stop();
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout/",
        method: "POST",
        body: {
          refresh: localStorage.getItem("refresh"),
          access: localStorage.getItem("access"),
        },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
          localStorage.removeItem("id");
        } catch (error) {
          stop();
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authAPI;
