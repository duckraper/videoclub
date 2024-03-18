from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from apps.peliculas.models import Pelicula


class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    estreno = SerializerMethodField()

    class Meta:
        model = Pelicula
        exclude = ['disponible']

    @staticmethod  # TODO Cubos OLAP y DATA Warehouse
    def get_estreno(obj):
        return obj.estreno
