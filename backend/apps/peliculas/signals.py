from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Pelicula


@receiver(post_save, sender=Pelicula)
def eliminar_peliculas_repetidas(sender, instance, created, **kwargs):
    """
    Luego de creada una pelicula, se buscara las repetidas, y se eliminaran,
    basandose en el título, director, y tamanio (calidad).
    """
    pelicula = instance

    peliculas = Pelicula.objects.filter(
        titulo=pelicula.titulo, director=pelicula.director, tamanio=pelicula.tamanio)

    if peliculas.count() > 1:
        print("borrando peliculas repetidas")

        peliculas.exclude(pk=pelicula.pk).delete()
