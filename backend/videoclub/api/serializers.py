from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework.validators import ValidationError
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from ..models import *


class ProvinciaSerializer(ModelSerializer):
    class Meta:
        model = Provincia
        fields = ['nombre']


class MunicipioSerializer(ModelSerializer):
    provincia = ProvinciaSerializer()

    class Meta:
        model = Municipio
        fields = [
            'nombre',
            'provincia'
        ]


class GeneroSerializer(ModelSerializer):
    class Meta:
        model = Genero
        fields = ['nombre']


class VideoClubSerializer(ModelSerializer):
    municipio = MunicipioSerializer()

    class Meta:
        model = VideoClub
        fields = '__all__'


class CaseteSerializer(ModelSerializer):
    videoclub = VideoClubSerializer()

    class Meta:
        model = Casete
        fields = '__all__'


class VCDSerializer(ModelSerializer):
    videoclub = VideoClubSerializer()

    class Meta:
        model = VCD
        fields = '__all__'


class DVDSerializer(ModelSerializer):
    videoclub = VideoClubSerializer()

    class Meta:
        model = DVD
        fields = '__all__'


class PeliculaSerializer(ModelSerializer):
    genero = GeneroSerializer()
    soporte = PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Pelicula
        fields = '__all__'


class PersonaSerializer(ModelSerializer):
    videoclubs = PrimaryKeyRelatedField(read_only=True, many=True)
    municipio = MunicipioSerializer()

    class Meta:
        model = Persona
        fields = '__all__'


class ClienteTemporalSerializer(ModelSerializer):
    persona = PersonaSerializer()
    genero_favorito = GeneroSerializer()

    class Meta:
        model = ClienteTemporal
        exclude = ['max_soportes_prestados', 'cant_soportes_alquilados']


class ClienteFijoSerializer(ModelSerializer):
    persona = PersonaSerializer()

    class Meta:
        model = ClienteFijo
        fields = '__all__'


class SolicitudPrestamoSerializer(ModelSerializer):
    cliente = PersonaSerializer()
    soporte = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SolicitudPrestamo
        fields = '__all__'
