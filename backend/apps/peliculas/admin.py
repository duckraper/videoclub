from django.contrib import admin
from .models import Pelicula


@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'genero', 'director',
                    'duracion', 'clasif_edad')
    filter_horizontal = ('soporte',)

