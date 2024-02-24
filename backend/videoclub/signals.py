from django.db import migrations
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
import json


@receiver(post_migrate)
def crear_registros_provincias_municipios(sender, **kwargs):
    """Crea los registros de provincias y municipios en la base de datos cada vez que se migra
    asi siempre las provincias y municipios seran algo estatico en cada base de datos"""

    APP_NAME = "videoclub"
    if sender.name == APP_NAME:
        Provincia = apps.get_model(APP_NAME, "Provincia")
        Municipio = apps.get_model(APP_NAME, "Municipio")

        with open('videoclub/assets/provincias.json', 'r') as datos:
            datos_provincias = json.load(datos)

        for provincia in datos_provincias:
            p, p_created = Provincia.objects.get_or_create(
                nombre=provincia["nombre"])
            if p_created:
                print(p)

            for municipio in provincia["municipios"]:
                m, m_created = Municipio.objects.get_or_create(
                    nombre=municipio, provincia=p)
                if m_created:
                    print(f"\t{m}")
                    m.save()
            if p_created:
                p.save()