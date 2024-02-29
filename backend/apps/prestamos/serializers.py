from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import SolicitudPrestamo
from clientes.serializers import ClienteSerializer

class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = ClienteSerializer()
    soporte = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'
