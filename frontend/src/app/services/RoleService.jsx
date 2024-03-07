import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export const roleAPI = createApi({
  reducerPath: "roleAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: "/api/roles/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Role",
                id,
              })),
              { type: "Role", id: "LIST" },
            ]
          : [{ type: "Role", id: "LIST" }],
    }),

    getRoleById: builder.query({
      query: (id) => ({
        url: `/api/roles/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Role", id }],

      async onQueryStarted(args, { queryFulfilled, getCacheEntry }) {
        try {
          await queryFulfilled;
          if (args === localStorage.getItem("user_id"))
            localStorage.setItem("Role", JSON.stringify(getCacheEntry().data));
        } catch (error) {
          localStorage.removeItem("Role");
        }
      },
    }),

    createRole: builder.mutation({
      query: (body) => ({
        url: "/api/roles/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/api/roles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),

    editRole: builder.mutation({
      query: (body) => ({
        url: `/api/roles/${body.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Role", id },
              { type: "Role", id: "LIST" },
            ]
          : [{ type: "Role", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useLazyGetRoleByIdQuery,
} = roleAPI;
