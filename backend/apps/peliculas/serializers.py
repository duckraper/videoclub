from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Pelicula



class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Pelicula
        fields = '__all__'
