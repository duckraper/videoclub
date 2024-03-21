import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export const clientsAPI = createApi({
  reducerPath: "clientsAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: "clientes/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Clients",
                id,
              })),
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }],
    }),

    getClientById: builder.query({
      query: (id, ...rest) => ({
        url: `clientes/${id}/`,
        method: "GET",
        body: rest,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Clients", id }],
    }),

    createClient: builder.mutation({
      query: (payload) => ({
        url: "clientes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),

    updateClient: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `clientes/${id}/`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, { id }) =>
        result
          ? [
              { type: "Clients", id },
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clientes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),
    createInvalidClient: builder.mutation({
      query: (id, rest) => ({
        url: `clientes/${id}/invalidar/`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),
    listInvalidClient: builder.query({
      query: () => ({
        url: `clientes/invalidados/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Clients",
                id,
              })),
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }],
    }),
    deleteInvalidClient: builder.mutation({
      query: (id) => ({
        url: `clientes/${id}/invalidar/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateInvalidClientMutation,
  useListInvalidClientQuery,
  useDeleteInvalidClientMutation,
} = clientsAPI;
