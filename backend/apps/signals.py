from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
import json
import codecs


@receiver(post_migrate)
def poblar_con_generos(sender, **kwargs):
    "Pobla la base de datos con géneros, a partir de utils.generos.json"
    if sender.name == "apps.peliculas":
        Genero = apps.get_model("peliculas", "Genero")

        with codecs.open('static/jsons/generos.json', 'r', encoding='utf-8') as datos:
            generos = json.load(datos)

        print("Poblando con géneros ...")
        for i, genero in enumerate(generos):
            genero, g_created = Genero.objects.get_or_create(nombre=genero)
            if g_created:
                print(f" {i}- {genero}")
            genero.save()


@receiver(post_migrate)
def poblar_con_peliculas(sender, **kwargs):
    print(sender.name)
    "Pobla la base de datos con peliculas, a partir de utils.peliculas.json"
    if sender.name == "apps.peliculas":
        Pelicula = apps.get_model("peliculas", "Pelicula")
        Genero = apps.get_model("peliculas", "Genero")

        with codecs.open('static/jsons/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        print("Poblando con peliculas ...")
        for i, pelicula in enumerate(peliculas, start=1):
            genero = Genero.objects.get(nombre=pelicula["genero"])

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
                print(f" {i}- {pelicula}")
            pelicula.save()
