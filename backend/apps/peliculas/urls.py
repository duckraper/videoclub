from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView
)

urlpatterns = [
    # mostrar listado de peliculas y crear pelicula
    path("peliculas/", PeliculaListCreateView.as_view(), name="pelicula-list-create"),

    # editar y borrar peliculas
    path("peliculas/<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(), name="pelicula-retrieve-update-destroy"),
]
