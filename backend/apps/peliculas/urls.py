from django.urls import path

from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView,
    ChangeEstrenoStateView,
)

urlpatterns = [
    # mostrar listado de peliculas y crear pelicula
    path("peliculas/", PeliculaListCreateView.as_view(),
         name="pelicula-list-create"),

    # editar y borrar peliculas
    path("peliculas/<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(),
         name="pelicula-retrieve-update-destroy"),

    # chequear si una pelicula ya cumplio 20 dias desde su estreno
    path("peliculas/check-date/", ChangeEstrenoStateView.as_view(),
         name="pelicula-check-date"),
]
