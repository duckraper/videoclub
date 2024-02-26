from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework.validators import ValidationError
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import *

class CaseteSerializer(ModelSerializer):

    class Meta:
        model = Casete
        fields = '__all__'


class VCDSerializer(ModelSerializer):

    class Meta:
        model = VCD
        fields = '__all__'


class DVDSerializer(ModelSerializer):

    class Meta:
        model = DVD
        fields = '__all__'

