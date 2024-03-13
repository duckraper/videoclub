from django.urls import path
from .views import (
    PeliculaListCreateView,
    PeliculaRetrieveUpdateDestroyView
)

urlpatterns = [
    path("", PeliculaListCreateView.as_view(), name="pelicula-list-create"),
    path("<int:pk>/", PeliculaRetrieveUpdateDestroyView.as_view(), name="pelicula-retrieve-update-destroy"),
]
