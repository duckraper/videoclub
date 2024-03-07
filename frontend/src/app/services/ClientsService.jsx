import { createApi } from "@reduxjs/toolkit/query/react"
import customFetchBase from "../../config/customBaseQuery"

export const clientsAPI = createApi({
    reducerPath: "clientsAPI",
    baseQuery: customFetchBase,
    tagTypes: ["Clients"],
    endpoints: (builder) => ({
        getclients: builder.query({
            query: () =>({ 
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
                    { type: "Clients", id: "LIST" }
                  ]
                : [{ type: "Clients", id: "LIST" }],
         }),

        getclientById: builder.query({
            query: (id) =>({ 
                url: `clientes/${id}/`,
                method: "GET",
        }),
        invalidatesTags: (result, error, id) => [{ type: "Clients", id }],
        
        }),

        createclient: builder.mutation({
            query: (payload) => ({
                url: "clientes",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: [{ type: "Clients", id: "LIST" }],
        }),

        updateclient: builder.mutation({
            query: ({body}) => ({
                url: `clientes/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, { id }) => 
                result 
                ?  [
                        { type: "Clients", id },
                        { type: "Clients", id: "LIST"}
                    ] : 
                    [{ type: "Clients", id: "LIST"}],

        }),
        deleteclient: builder.mutation({
            query: (id) => ({
                url: `clientes/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Clients", id: "LIST" }],
        }),
        createFijoClient: builder.mutation({
            query: (id) => ({
                url: `clientes/${id}/crear-fijo/`,
                method: "POST",
                body
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
                        { type: "Clients", id: "LIST" }
                    ]
                    : [{ type: "Clients", id: "LIST" }],
        }),
        deleteInvalidClient: builder.mutation({
            query: (id) => ({
                url: `clientes/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Clients", id: "LIST" }],
        }),
    }),
})


export const {
    useGetClientsQuery,
    useLazyGetClientByIdQuery,
    useCreateClientsMutation,
    useUpdateClientsMutation, 
    useDeleteClientMutation,
    useCreateFijoClientMutation,
    useListInvalidClientQuery,
    useDeleteInvalidClientMutation,
} = clientsAPI;