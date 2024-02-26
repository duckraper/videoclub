from rest_framework.serializers import PrimaryKeyRelatedField, ModelSerializer
from .models import Cliente, ClienteTemporal, ClienteFijo
from peliculas.serializers import GeneroSerializer

class ClienteSerializer(ModelSerializer):
    videoclubs = PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Cliente
        fields = '__all__'


class ClienteTemporalSerializer(ModelSerializer):
    persona = ClienteSerializer()
    genero_favorito = GeneroSerializer()

    class Meta:
        model = ClienteTemporal
        exclude = ['max_soportes_prestados', 'cant_soportes_alquilados']


class ClienteFijoSerializer(ModelSerializer):
    persona = ClienteSerializer()

    class Meta:
        model = ClienteFijo
        fields = '__all__'
