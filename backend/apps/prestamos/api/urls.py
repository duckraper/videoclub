from django.urls import path

from .views import (
    ListCreateSolicitudView,
    DevolverPrestamoView,
    RetrieveDeleteSolicitudView
)

urlpatterns = [
    path('', ListCreateSolicitudView.as_view(), name='list-create-prestamos'),
    path('<int:pk>/', RetrieveDeleteSolicitudView.as_view(), name='rud-prestamo'),
    path('<int:pk>/devolver/', DevolverPrestamoView.as_view(), name='devolver-prestamo')
]
