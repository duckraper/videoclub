import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../config/customBaseQuery";

export const filmsAPI = createApi({
  reducerPath: "filmsAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Films"],
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: () => ({
        url: "peliculas/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Films",
                id,
              })),
              { type: "Films", id: "LIST" },
            ]
          : [{ type: "Films", id: "LIST" }],
    }),

    getFilmById: builder.query({
      query: (id) => ({
        url: `peliculas/${id}/`,
        method: "GET",
        body,
      }),
      providesTags: (result, error, id) => [{ type: "Films", id }],
    }),

    createFilm: builder.mutation({
      query: (body) => ({
        url: "peliculas/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Films", id: "LIST" }],
    }),

    updateFilm: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `peliculas/${id}/`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, { id }) =>
        result
          ? [
              { type: "Films", id },
              { type: "Films", id: "LIST" },
            ]
          : [{ type: "Films", id: "LIST" }],
    }),

    deleteFilm: builder.mutation({
      query: (id) => ({
        url: `peliculas/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Films", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
  useCreateFilmMutation,
  useUpdateFilmMutation,
  useDeleteFilmMutation,
} = filmsAPI;
