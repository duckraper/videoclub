from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField

from .models import Casete, DVD, VCD, Soporte

SOPORTES = ['casete', 'vcd', 'dvd']


# TODO: implementar serializadores por objeto, y no por id

class SoporteSerializer(ModelSerializer):
    peliculas = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Soporte
        fields = '__all__'


class CaseteSerializer(ModelSerializer):
    peliculas = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Casete
        fields = '__all__'


class VCDSerializer(ModelSerializer):
    peliculas = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = VCD
        fields = '__all__'


class DVDSerializer(ModelSerializer):
    peliculas = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = DVD
        fields = '__all__'
