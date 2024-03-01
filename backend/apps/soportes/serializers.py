from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField

from .models import Casete, DVD, VCD, Soporte
from apps.peliculas.serializers import PeliculaSerializer

SOPORTES = ['casete', 'vcd', 'dvd']


# TODO: implementar serializadores por objeto, y no por id

class SoporteSerializer(ModelSerializer):
    peliculas = PrimaryKeyRelatedField(many=True, read_only=True)
    # peliculas = PeliculaSerializer(many=True, read_only=True)

    class Meta:
        model = Soporte
        fields = '__all__'


class CaseteSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = Casete


class VCDSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = VCD


class DVDSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = DVD
