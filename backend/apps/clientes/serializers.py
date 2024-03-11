from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Cliente, ClienteFijo, Invalidacion


class ClienteSerializer(ModelSerializer):
    es_fijo = SerializerMethodField()

    class Meta:
        model = Cliente
        exclude = ['max_soportes_prestados', 'activo']

    @staticmethod
    def get_es_fijo(obj):
        return obj.es_fijo


class ClienteFijoSerializer(ClienteSerializer):
    class Meta(ClienteSerializer.Meta):
        model = ClienteFijo


class InvalidacionSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)

    class Meta:
        model = Invalidacion
        fields = '__all__'
