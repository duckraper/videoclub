from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Pelicula, Genero


class GeneroSerializer(ModelSerializer):
    class Meta:
        model = Genero
        fields = ['nombre']


class PeliculaSerializer(ModelSerializer):
    genero = GeneroSerializer()
    soporte = PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Pelicula
        fields = '__all__'
