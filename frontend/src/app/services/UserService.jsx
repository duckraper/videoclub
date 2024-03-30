import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export function buildFiltersUrl(base, parametros) {
  let searchParams = new URLSearchParams();
  for (let param in parametros) {
    if (parametros[param]) searchParams.append(param, parametros[param]);
  }
  if (parametros) return base + "?" + searchParams.toString();
  else return base;
}

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ filterParams }) => ({
        url: buildFiltersUrl("auth/users/", filterParams),
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User",
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/auth/users/me/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],

      async onQueryStarted(args, { queryFulfilled, getCacheEntry }) {
        try {
          let data = getCacheEntry().data;

          await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          localStorage.removeItem("user");
          localStorage.removeItem("access");
        }
      },
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: "auth/users/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    editUser: builder.mutation({
      query: (body) => ({
        url: `auth/users/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "User", id },
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useLazyGetUserByIdQuery,
} = userAPI;
