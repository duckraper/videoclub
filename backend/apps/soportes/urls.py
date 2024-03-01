from django.urls import path
from .views import (
    SoporteListCreateSet,
    GrabarPeliculaView,
    DarBajaSoporteView,
    RetrieveSoporte
)

urlpatterns = [
    path('soportes/', SoporteListCreateSet().as_view(), name="soportes"), # Lista de soportes

    path('soportes/<int:pk>/', RetrieveSoporte().as_view(), name="soporte"), # Detalle de un soporte
    path('soportes/<int:pk>/grabar/', GrabarPeliculaView().as_view(), name="grabar-pelicula"), # Grabar pelicula en soporte
    path('soportes/<int:pk>/baja/', DarBajaSoporteView().as_view(), name="dar-baja-soporte") # Dar de baja a un soporte
]
