from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import SolicitudPrestamo
from apps.clientes.serializers import ClienteSerializer
from apps.soportes.serializers import SoporteSerializer


class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    soporte = SoporteSerializer(read_only=True)
    vencido = SerializerMethodField()

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'

    def to_representation(self, instance):
        return super().to_representation(instance)

    @staticmethod
    def get_vencido(obj):
        return obj.vencido
