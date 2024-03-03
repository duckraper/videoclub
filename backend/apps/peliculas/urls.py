from django.urls import path
from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView,
    GeneroListView,
)

urlpatterns = [
    # mostrar listado de peliculas y crear pelicula
    path("peliculas/", PeliculaListCreateView.as_view(), name="pelicula-list-create"),
    path("peliculas/generos/", GeneroListView.as_view(), name="genero-list"),

    # editar y borrar peliculas
    path("peliculas/<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(), name="pelicula-retrieve-update-destroy"),
]
