from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Pelicula, Genero
from apps.soportes.models import Soporte as Peli


class GeneroSerializer(ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'


class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(many=True, read_only=True)
    genero = GeneroSerializer()

    class Meta:
        model = Pelicula
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not instance.disponible:
            data.pop('soportes')
        return data
