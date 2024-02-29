from rest_framework.serializers import PrimaryKeyRelatedField, ModelSerializer
from .models import Cliente, ClienteTemporal, ClienteFijo


class ClienteSerializer(ModelSerializer):
    class Meta:
        model = Cliente
        exclude = ['cant_soportes_alquilados']


class ClienteTemporalSerializer(ModelSerializer):
    persona = ClienteSerializer()

    class Meta:
        model = ClienteTemporal
        exclude = ['max_soportes_prestados']


class ClienteFijoSerializer(ModelSerializer):
    persona = ClienteSerializer()

    class Meta:
        model = ClienteFijo
        exclude = ['max_soportes_prestados']
