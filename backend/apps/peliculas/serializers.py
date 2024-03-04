from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from .models import Pelicula
from apps.soportes.models import Soporte as Peli




class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(many=True, read_only=True)
    estreno = SerializerMethodField()

    class Meta:
        model = Pelicula
        exclude = ['disponible']

    def get_estreno(self, obj):
        return obj.estreno
