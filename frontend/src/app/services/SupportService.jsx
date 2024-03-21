import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export const supportAPI = createApi({
    reducerPath: "supportAPI",
    baseQuery: customFetchBase,
    tagTypes: ["Support"],
    endpoints: (builder) => ({
        getSupports: builder.query({
        query: () => ({
            url: "soportes/",
            method: "GET",
        }),
        providesTags: (result) =>
            result
            ? [
                ...result.map(({ id }) => ({
                    type: "Support",
                    id,
                })),
                { type: "Support", id: "LIST" },
                ]
            : [{ type: "Support", id: "LIST" }],
        }),
    
        getSupportById: builder.query({
        query: (id) => ({
            url: `soportes/${id}/`,
            method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "Support", id }],
        }),
    
        createSupport: builder.mutation({
        query: (body) => ({
            url: "soportes/",
            method: "POST",
            body,
        }),
        invalidatesTags: [{ type: "Support", id: "LIST" }],
        }),
    
        grabarSupport: builder.mutation({
        query: (body) => ({
            url: `soportes/${body.id}/grabar/`,
            method: "POST",
            body,
        }),
        invalidatesTags: (result, { id }) =>
            result
            ? [
                { type: "Support", id },
                { type: "Support", id: "LIST" },
                ]
            : [{ type: "Support", id: "LIST" }],
        }),
    
        bajaSupport: builder.mutation({
        query: (id) => ({
            url: `soportes/${id}/`,
            method: "DELETE",
        }),
        invalidatesTags: [{ type: "Support", id: "LIST" }],
        }),
    }),
});

export const { 
    useGetSupportsQuery, 
    useGetSupportByIdQuery, 
    useCreateSupportMutation, 
    useGrabarSupportMutation, 
    useBajaSupportMutation 
} = supportAPI;
