from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.status import HTTP_200_OK
from datetime import date, timedelta, datetime

from .models import Pelicula
from .serializers import PeliculaSerializer


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


class ChangeEstrenoStateView(APIView):
    """
    Chequea que peliculas ya no son estrenos
    """
    permission_classes = [AllowAny]

    def get(self):
        peliculas = Pelicula.objects.all().filter(estreno=True)

        print("Chequeando peliculas en estreno...")
        for pelicula in peliculas:
            fecha_estreno = datetime.strptime(
                str(pelicula.fecha_estreno), "%Y-%m-%d").date()

            if date.today() - fecha_estreno >= timedelta(days=20):
                print(f"{pelicula.titulo} ya no es un estreno. Actualizando...")
                pelicula.estreno = False
                pelicula.save()

        return Response({"message": "Estados de estreno actualizados."}, status=HTTP_200_OK)
