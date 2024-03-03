from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.status import HTTP_200_OK
from datetime import date, timedelta, datetime

from .models import Pelicula, Genero
from .serializers import PeliculaSerializer


class GeneroListView(ReadOnlyModelViewSet):
    """
    View para listar géneros.
    """
    queryset = Genero.objects.all().order_by('nombre')
    serializer_class = PeliculaSerializer

class PeliculaListCreateView(ListCreateAPIView):
    """
    View para listar y crear películas.
    """
    queryset = Pelicula.objects.all().order_by('titulo')
    serializer_class = PeliculaSerializer


class PeliculaRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    Vista de API para ver, actualizar y eliminar una película.
    """
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

