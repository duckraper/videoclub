from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.clientes.models import Cliente, ClienteFijo, Invalidacion


class ClienteSerializer(ModelSerializer):
    es_fijo = SerializerMethodField()
    invalidado = SerializerMethodField()

    class Meta:
        model = Cliente
        exclude = ['max_soportes_prestados', 'activo']

    @staticmethod
    def get_es_fijo(obj):
        return obj.es_fijo

    @staticmethod
    def get_invalidado(obj):
        return obj.invalidado


class ClienteFijoSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)

    class Meta:
        model = ClienteFijo
        fields = '__all__'


class InvalidacionSerializer(ModelSerializer):
    cliente = ClienteSerializer(read_only=True)

    class Meta:
        model = Invalidacion
        fields = '__all__'
