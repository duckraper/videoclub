from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Pelicula
from apps.soportes.models import Soporte as Peli



class PeliculaSerializer(ModelSerializer):
    soportes = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Pelicula
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not instance.disponible:
            data.pop('soportes')
        return data
