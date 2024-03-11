from rest_framework.serializers import ModelSerializer

from apps.clientes.serializers import ClienteSerializer
from apps.soportes.serializers import SoporteSerializer
from .models import SolicitudPrestamo


class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    soporte = SoporteSerializer(read_only=True)

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'

    @staticmethod
    def get_vencido(obj):
        print(obj)
        return obj.vencido
