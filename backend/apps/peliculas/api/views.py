from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from apps.peliculas.models import Pelicula
from .serializers import PeliculaSerializer
from django.db.models import Q


class PeliculaListCreateView(ListCreateAPIView):
    """
    View para listar y crear películas.
    """
    serializer_class = PeliculaSerializer

    def get_queryset(self):
        params = self.request.query_params
        search_query = params.get('search')

        queryset = Pelicula.objects.all().filter(
            Q(titulo__icontains=search_query) |
            Q(director__icontains=search_query),
            disponible=True
        ) if search_query else Pelicula.objects.all().filter(disponible=True)
        print(queryset)
        return queryset


class PeliculaRetrieveUpdateDestroyView(RetrieveUpdateAPIView, APIView):
    """
    Vista de API para ver, actualizar y eliminar una película.
    """
    queryset = Pelicula.objects.all().filter(disponible=True)
    serializer_class = PeliculaSerializer

    def delete(self, request, pk, *args, **kwargs):
        try:
            pelicula = self.get_object()
            pelicula.disponible = False
            pelicula.save()

            return Response("Pelicula eliminada", status=HTTP_204_NO_CONTENT)
        except Pelicula.DoesNotExist:
            return Response("Pelicula no encontrada", status=HTTP_404_NOT_FOUND)
