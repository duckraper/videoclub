from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework.validators import ValidationError


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

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
