
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)

from .models import Pelicula
from .serializers import PeliculaSerializer


class PeliculaListCreateView(ListCreateAPIView):
    """
    View para listar y crear películas.
    """
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

# khgk
class PeliculaRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    Vista de API para ver, actualizar y eliminar una película.
    """
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer
