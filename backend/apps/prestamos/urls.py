from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ListCreateSolicitudView

urlpatterns = [
    path('prestamos/', ListCreateSolicitudView.as_view(), name='list-create-prestamos'),
]
