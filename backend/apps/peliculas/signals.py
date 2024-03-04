from datetime import datetime as dt
from django.db.models.signals import post_migrate, pre_save, post_save
from django.dispatch import receiver
from django.apps import apps
from .models import Pelicula
import json
import codecs

@receiver(post_save, sender=Pelicula)
def eliminar_peliculas_repetidas(sender, instance, created, **kwargs):
    pelicula = instance
    peliculas = Pelicula.objects.filter(titulo=pelicula.titulo, director=pelicula.director)

    if peliculas.count() > 1:
        print("borrando peliculas repetidas")

        peliculas.exclude(pk=pelicula.pk).delete()
