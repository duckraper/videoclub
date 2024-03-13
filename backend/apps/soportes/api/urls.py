from django.urls import path
from .views import (
    SoporteListCreateSet,
    GrabarPeliculaView,
    DarBajaSoporteView,
    RetrieveSoporte
)

urlpatterns = [
    path('', SoporteListCreateSet().as_view(), name="soportes"),  # Lista de soportes

    path('<int:pk>/', RetrieveSoporte().as_view(), name="soporte"),  # Detalle de un soporte
    path('<int:pk>/grabar/', GrabarPeliculaView().as_view(), name="grabar-pelicula"),  # Grabar pelicula en soporte
    path('<int:pk>/baja/', DarBajaSoporteView().as_view(), name="dar-baja-soporte")  # Dar de baja a un soporte
]
