from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Pelicula
from .serializers import PeliculaSerializer


class PeliculaListCreateView(ListCreateAPIView):
    """
    View para listar y crear películas.
    """
    queryset = Pelicula.objects.all().filter(disponible=True)
    serializer_class = PeliculaSerializer


class PeliculaRetrieveUpdateDestroyView(RetrieveUpdateAPIView, APIView):
    """
    Vista de API para ver, actualizar y eliminar una película.
    """
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

    def delete(self, request, pk, *args, **kwargs):
        try:
            pelicula = self.get_object()
            pelicula.disponible = False
            pelicula.save()

            return Response("Pelicula eliminada", status=HTTP_204_NO_CONTENT)
        except Pelicula.DoesNotExist:
            return Response("Pelicula no encontrada", status=HTTP_404_NOT_FOUND)
