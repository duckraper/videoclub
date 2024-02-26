from django.contrib import admin
from .models import Pelicula, Genero


@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'genero', 'director',
                    'duracion', 'clasif_edad')
    filter_horizontal = ('soporte',)


@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'mostrar_peliculas')

    def mostrar_peliculas(self, obj):
        peliculas = obj.peliculas.all()
        return ", ".join([pelicula.titulo for pelicula in peliculas])
