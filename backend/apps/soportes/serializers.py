from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import Casete, DVD, VCD, Soporte
from apps.peliculas.serializers import PeliculaSerializer

SOPORTES = ['casete', 'vcd', 'dvd']


class SoporteSerializer(ModelSerializer):
    peliculas = PeliculaSerializer(many=True, read_only=True)

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
