from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from apps.clientes.serializers import ClienteSerializer
from apps.clientes.models import Cliente, ClienteFijo
from apps.soportes.models import Soporte
from apps.soportes.serializers import SoporteSerializer
from .models import SolicitudPrestamo


class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    soporte = SoporteSerializer(read_only=True)

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'

    def to_representation(self, instance):
        return super().to_representation(instance)

    @staticmethod
    def get_vencido(obj):
        print(obj)
        return obj.vencido
