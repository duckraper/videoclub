from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from .models import Pelicula


class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    estreno = SerializerMethodField()

    class Meta:
        model = Pelicula
        exclude = ['disponible']

    @staticmethod
    def get_estreno(obj):
        return obj.estreno
