import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export const rentsAPI = createApi({
    reducerPath: "rentsAPI",
    baseQuery: customFetchBase,
    tagTypes: ["Rents"],
    endpoints: (builder) => ({
        getRents: builder.query({
        query: () => ({
            url: "prestamos/",
            method: "GET",
        }),
        providesTags: (result) =>
            result
            ? [
                ...result.map(({ id }) => ({
                    type: "Rents",
                    id,
                })),
                { type: "Rents", id: "LIST" },
                ]
            : [{ type: "Rents", id: "LIST" }],
        }),
    
        getRentById: builder.query({
        query: (id, ...rest) => ({
            url: `prestamos/${id}/`,
            method: "GET",
            body: rest,
        }),
        providesTags: (result, error, id) => [{ type: "Rents", id }],
        }),
    
        createRent: builder.mutation({
        query: (payload) => ({
            url: "prestamos/",
            method: "POST",
            body: payload,
        }),
        invalidatesTags: [{ type: "Rents", id: "LIST" }],
        }),
    
        returnRent: builder.mutation({
        query: ({ body }) => ({
            url: `prestamos/${body.id}/devolver`,
            method: "POST",
            body,
        }),
        invalidatesTags: (result, { id }) =>
            result
            ? [
                { type: "Rents", id },
                { type: "Rents", id: "LIST" },
                ]
            : [{ type: "Rents", id: "LIST" }],
        }),
    
        deleteRent: builder.mutation({
        query: (id) => ({
            url: `prestamos/${id}/`,
            method: "DELETE",
        }),
        invalidatesTags: [{ type: "Rents", id: "LIST" }],
        }),
    }),
});

export const {
    useGetRentsQuery,
    useGetRentByIdQuery,
    useCreateRentMutation,
    useReturnRentMutation,
    useDeleteRentMutation,
} = rentsAPI;
