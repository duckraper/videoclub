from datetime import datetime as dt
from time import strptime
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
import json
import codecs


@receiver(post_migrate)
def poblar_con_peliculas(sender, **kwargs):
    print(sender.name)
    "Pobla la base de datos con peliculas, a partir de utils.peliculas.json"
    if sender.name == "apps.peliculas":
        Pelicula = apps.get_model("peliculas", "Pelicula")

        with codecs.open('static/jsons/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        print("Poblando con peliculas ...")
        for i, pelicula in enumerate(peliculas, start=1):
            genero = pelicula["genero"]

            pelicula, p_created = Pelicula.objects.get_or_create(
                tamanio=pelicula["tamanio"],
                titulo=pelicula["titulo"],
                genero=genero,
                fecha_estreno=dt.strptime(pelicula["fecha_estreno"], '%Y-%m-%d').date(),
                director=pelicula["director"],
                duracion=pelicula["duracion"],
                clasif_edad=pelicula["clasif_edad"]
            )
            if p_created:
                print(f" {i}- {pelicula}")
            pelicula.save()
