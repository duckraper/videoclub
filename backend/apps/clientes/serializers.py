from rest_framework.serializers import ModelSerializer
from .models import Cliente, ClienteFijo, Invalidacion
from apps.peliculas.models import GENEROS


class ClienteSerializer(ModelSerializer):

    class Meta:
        model = Cliente
        exclude = ['max_soportes_prestados', 'activo']


class ClienteFijoSerializer(ClienteSerializer):

    class Meta(ClienteSerializer.Meta):
        model = ClienteFijo


class InvalidacionSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)

    class Meta:
        model = Invalidacion
        fields = '__all__'
