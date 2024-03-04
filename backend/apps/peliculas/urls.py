from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView,
    GeneroListView,
)

genero_router = DefaultRouter()
genero_router.register(r'', GeneroListView, basename='genero')

urlpatterns = [
    # mostrar listado de peliculas y crear pelicula
    path("peliculas/", PeliculaListCreateView.as_view(), name="pelicula-list-create"),
    path("peliculas/generos/", include(genero_router.urls)),

    # editar y borrar peliculas
    path("peliculas/<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(), name="pelicula-retrieve-update-destroy"),
]
