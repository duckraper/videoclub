from django.urls import path
from .views import (
    SoporteListCreateSet,
    GrabarPeliculaView,
    DarBajaSoporteView
)

urlpatterns = [
    path('soportes/', SoporteListCreateSet().as_view(), name="soportes"),
    path('soportes/<int:pk>/grabar/', GrabarPeliculaView().as_view(), name="grabar-pelicula"),
    path('soportes/<int:pk>/baja/', DarBajaSoporteView().as_view(), name="dar-baja-soporte")
]
