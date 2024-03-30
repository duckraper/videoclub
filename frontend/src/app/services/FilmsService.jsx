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

export const filmsAPI = createApi({
  reducerPath: "filmsAPI",
  baseQuery: customFetchBase,
  tagTypes: ["Films"],
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: ({ filterParams }) => ({
        url: buildFiltersUrl("peliculas/", filterParams),
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
      invalidatesTags: ["Films"],
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
