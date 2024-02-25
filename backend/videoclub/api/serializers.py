from pyexpat import model
from re import M
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework.validators import ValidationError
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

import videoclub
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

# AUTHENTICATION
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'password',
            'is_active',
            'is_staff'
        ]

    def create(self, validated_data):
        try:
            password = validated_data.pop('password')
            validate_password(password)
            validated_data['password'] = make_password(password)

            return super().create(validated_data)

        except ValidationError as e:
            raise serializers.ValidationError(str(e))

    def update(self, instance, validated_data):
        try:
            if 'password' in validated_data:
                password = validated_data.pop('password')
                validate_password(password)
                instance.password = make_password(password)

            return super().update(instance, validated_data)

        except ValidationError as e:
            raise serializers.ValidationError(str(e))
