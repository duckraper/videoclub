from django.urls import path
from .views import (
    SoporteListCreateSet,
    GrabarPeliculaView,
    RetrieveSoporte
)

urlpatterns = [
    path('', SoporteListCreateSet().as_view(), name="soportes"),  # Lista de soportes

    path('<int:pk>/', RetrieveSoporte().as_view(), name="soporte"),  # Detalle de un soporte
    path('<int:pk>/grabar/', GrabarPeliculaView().as_view(), name="grabar-pelicula"),  # Grabar pelicula en soporte
]
