import re
from django.db import migrations
from django.db.models.signals import post_migrate, post_save, post_delete
from django.dispatch import receiver
from django.apps import apps
import json
import codecs
from datetime import datetime

APP_NAME = "peliculas"

@receiver(post_migrate)
def poblar_con_peliculas(sender, **kwargs):
    "Pobla la base de datos con peliculas, a partir de utils.peliculas.json"
    if sender.name == APP_NAME:
        Pelicula = apps.get_model(APP_NAME, "Pelicula")

        with codecs.open('static/jsons/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        print("Poblando con peliculas ...")
        for pelicula in peliculas:
            genero = pelicula["genero"]
            pelicula, p_created = Pelicula.objects.get_or_create(
                tamanio=pelicula["tamanio"],
                titulo=pelicula["titulo"],
                genero=genero,
                fecha_estreno=pelicula["fecha_estreno"],
                director=pelicula["director"],
                duracion=pelicula["duracion"],
                clasif_edad=pelicula["clasif_edad"]
            )
            if p_created:
                print(pelicula)
            pelicula.save()
