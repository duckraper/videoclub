from django.urls import path
from .views import (
    ListCreateClienteView,
    RetrieveUpdateDestroyClienteView,
    InvalidarClienteView,
    ListInvalidadosView,
    ListClientesFijosView
    )

urlpatterns = [
    path('', ListCreateClienteView.as_view(), name='list-create-cliente'),
    path('fijos/', ListClientesFijosView.as_view(), name='list-clientes-fijos'),
    path('<int:pk>/', RetrieveUpdateDestroyClienteView.as_view(), name='retrieve-update-destroy-cliente'),

    path('<int:pk>/invalidar/', InvalidarClienteView.as_view(), name='invalidar-cliente'),
    path('invalidados/', ListInvalidadosView.as_view(), name='list-invalidados')
]
