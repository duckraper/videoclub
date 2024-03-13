from rest_framework.serializers import ModelSerializer

from apps.clientes.api.serializers import ClienteSerializer
from apps.soportes.api.serializers import SoporteSerializer
from apps.prestamos.models import SolicitudPrestamo


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
