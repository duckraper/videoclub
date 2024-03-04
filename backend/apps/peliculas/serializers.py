from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from .models import Pelicula, Genero
from apps.soportes.models import Soporte as Peli


class GeneroSerializer(ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'


class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(many=True, read_only=True)
    estreno = SerializerMethodField()
    genero = GeneroSerializer()

    class Meta:
        model = Pelicula
        fields = '__all__'

    def get_estreno(self, obj):
        return obj.estreno
