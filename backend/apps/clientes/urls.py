from django.urls import path

from .views import (
    ListCreateClienteView,
    RetrieveUpdateDestroyClienteView,
    InvalidarClienteView,
    CrearClienteFijoView,
    ListInvalidadosView,
    ListClientesFijosView
    )

urlpatterns = [
    # CRUD de clientes
    path('clientes/', ListCreateClienteView.as_view(), name='list-create-cliente'),
    path('clientes/fijos/', ListClientesFijosView.as_view(), name='list-clientes-fijos'),
    path('clientes/<int:pk>/', RetrieveUpdateDestroyClienteView.as_view(), name='retrieve-update-destroy-cliente'),
    path('clientes/<int:pk>/crear-fijo/', CrearClienteFijoView.as_view(), name='crear-cliente-fijo'),

    # Invalidar y validar clientes
    path('clientes/<int:pk>/invalidar/', InvalidarClienteView.as_view(), name='invalidar-cliente'),

    # Lista de invalidaciones
    path('clientes/invalidados/', ListInvalidadosView.as_view(), name='list-invalidados')
]