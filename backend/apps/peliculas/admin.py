from django.contrib import admin
from .models import Pelicula

from apps.peliculas.models import Pelicula


@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    pass