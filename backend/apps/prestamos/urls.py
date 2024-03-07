from django.urls import path

from .views import (
    ListCreateSolicitudView,
    DevolverPrestamoView,
    RetrieveDeleteSolicitudView
)

urlpatterns = [
    path('prestamos/', ListCreateSolicitudView.as_view(), name='list-create-prestamos'),
    path('prestamos/<int:pk>/', RetrieveDeleteSolicitudView.as_view(), name='rud-prestamo'),
    path('prestamos/<int:pk>/devolver/', DevolverPrestamoView.as_view(), name='devolver-prestamo')
]
