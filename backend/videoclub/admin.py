from django.contrib import admin
from .models import *


@admin.register(VideoClub)
class VideoClubAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'municipio', 'direccion',
                    'telefono', 'cant_soportes')
    # filter_horizontal = ('soportes',)


@admin.register(DVD)
class DVDAdmin(admin.ModelAdmin):
    list_display = ('id', 'tamanio', 'formato_almacenamiento')


@admin.register(Casete)
class CaseteAdmin(admin.ModelAdmin):
    list_display = ('id', 'formato_cinta', 'cant_peliculas')


@admin.register(VCD)
class VCDAdmin(admin.ModelAdmin):
    list_display = ('id', 'marca')
    


@admin.register(Municipio)
class MunicipioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'provincia')


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




@admin.register(SolicitudPrestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha_prestamo',
                    'fecha_devolucion', 'cliente', 'soporte')
