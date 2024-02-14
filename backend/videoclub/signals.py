from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
import json


@receiver(post_migrate)
def crear_registros_provincias_municipios(sender, **kwargs):
    """Crea los registros de provincias y municipios en la base de datos cada vez que se migra
    asi siempre las provincias y municipios seran algo estatico en cada base de datos"""

    APP_NAME = "videoclub"
    if sender.name == APP_NAME:  # si la aplicacion que se migra es la de videoclub
        # obtiene el modelo Provincia
        Provincia = apps.get_model(APP_NAME, "Provincia")
        # obtiene el modelo Municipio
        Municipio = apps.get_model(APP_NAME, "Municipio")

        # abre el archivo provincias.json y lo carga en datos_provincias
        with open('provincias.json', 'r') as datos:
            datos_provincias = json.load(datos)

        # por cada provincia en datos_provincias
        for provincia in datos_provincias:
            # crea el registro de la provincia si no existe
            p = Provincia.objects.get_or_create(
                nombre=provincia["nombre"])

            # por cada municipio en la lista de municipios de la provincia
            for municipio in provincia["municipios"]:
                # crea el registro del municipio si no existe
                m = Municipio.objects.get_or_create(
                    nombre=municipio, provincia=p)
