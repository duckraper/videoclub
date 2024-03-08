from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Casete, DVD, VCD, Soporte
from .utils import parse_soporte
from apps.peliculas.serializers import PeliculaSerializer

SOPORTES = ['casete', 'vcd', 'dvd']


class SoporteSerializer(ModelSerializer):
    peliculas = PeliculaSerializer(many=True, read_only=True)
    tipo_de_soporte = SerializerMethodField(read_only=True)

    class Meta:
        model = Soporte
        fields = '__all__'

    @staticmethod
    def get_tipo_de_soporte(obj):
        return parse_soporte(obj).__class__.__name__


class CaseteSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = Casete


class VCDSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = VCD


class DVDSerializer(SoporteSerializer):
    class Meta(SoporteSerializer.Meta):
        model = DVD
