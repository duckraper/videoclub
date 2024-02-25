import re
from django.db import migrations
from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from django.apps import apps
import json
import codecs


@receiver(post_migrate)
def crear_registros_provincias_municipios(sender, **kwargs):
    """Crea los registros de provincias y municipios en la base de datos cada vez que se migra
    asi siempre las provincias y municipios seran algo estatico en cada base de datos"""

    APP_NAME = "videoclub"
    if sender.name == APP_NAME:
        Provincia = apps.get_model(APP_NAME, "Provincia")
        Municipio = apps.get_model(APP_NAME, "Municipio")

        with codecs.open('videoclub/utils/provincias.json', 'r', encoding='utf-8') as datos:
            datos_provincias = json.load(datos)

        print("Poblando con provincias y municipios ...")
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


@receiver(post_migrate)
def poblar_con_videoclubs(sender, **kwargs):
    "Pobla la base de datos con videoclubs, a partir de utils.videoclubs.json"
    APP_NAME = "videoclub"
    if sender.name == APP_NAME:
        VideoClub = apps.get_model(APP_NAME, "VideoClub")
        Municipio = apps.get_model(APP_NAME, "Municipio")

        with codecs.open('videoclub/utils/videoclubs.json', 'r', encoding='utf-8') as datos:
            videoclubs = json.load(datos)

        print("Poblando con videoclubs ...")
        for videoclub in videoclubs:
            m = Municipio.objects.get(nombre=videoclub["municipio"])
            vc, vc_created = VideoClub.objects.get_or_create(
                nombre=videoclub["nombre"],
                municipio=m,
                direccion=videoclub["direccion"],
                telefono=videoclub["telefono"]
            )
            if vc_created:
                print(vc)
            vc.save()


@receiver(post_migrate)
def poblar_con_generos(sender, **kwargs):
    "Pobla la base de datos con generos de peliculas, a partir de utils.generos.json"
    APP_NAME = "videoclub"
    if sender.name == APP_NAME:
        Genero = apps.get_model(APP_NAME, "Genero")

        with codecs.open('videoclub/utils/generos.json', 'r', encoding='utf-8') as datos:
            generos = json.load(datos)

        print("Poblando con generos ...")
        for genero in generos:
            g, g_created = Genero.objects.get_or_create(nombre=genero)
            if g_created:
                print(g)
            g.save()


@receiver(post_migrate)
def poblar_con_peliculas(sender, **kwargs):
    "Pobla la base de datos con peliculas, a partir de utils.peliculas.json"
    APP_NAME = "videoclub"
    if sender.name == APP_NAME:
        Genero = apps.get_model(APP_NAME, "Genero")
        Pelicula = apps.get_model(APP_NAME, "Pelicula")

        with codecs.open('videoclub/utils/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        print("Poblando con peliculas ...")
        for pelicula in peliculas:
            genero = Genero.objects.get(nombre=pelicula["genero"])
            pelicula, p_created = Pelicula.objects.get_or_create(
                tamanio=pelicula["tamanio"],
                titulo=pelicula["titulo"],
                genero=genero,
                anio=pelicula["anio"],
                director=pelicula["director"],
                duracion=pelicula["duracion"],
                clasif_edad=pelicula["clasif_edad"],
                estreno=pelicula["estreno"]
            )
            if p_created:
                print(pelicula)
            pelicula.save()
