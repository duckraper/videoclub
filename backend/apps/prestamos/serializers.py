from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.clientes.serializers import ClienteSerializer
from apps.soportes.serializers import SoporteSerializer
from .models import SolicitudPrestamo


class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    soporte = SoporteSerializer(read_only=True)
    vencido = SerializerMethodField(read_only=True)

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'

    def to_representation(self, instance):
        print(instance)
        return super().to_representation(instance)

    @staticmethod
    def get_vencido(obj):
        print(obj)
        return obj.vencido
