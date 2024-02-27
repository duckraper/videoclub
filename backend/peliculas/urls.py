from django.urls import path

from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("peliculas/", PeliculaListCreateView.as_view(),
         name="pelicula-list-create"),

    path("peliculas/<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(),
         name="pelicula-retrieve-update-destroy"),
]
