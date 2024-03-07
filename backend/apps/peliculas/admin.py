from django.contrib import admin
from .models import Pelicula

from apps.peliculas.models import Pelicula


@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    list_display = (
        "titulo",
        "genero",
        "duracion",
        "director",
        "clasif_edad",
        "tamanio",
        "precio",
        "disponible",
    )
    list_filter = ("genero", "clasif_edad", "disponible")
    search_fields = ("titulo", "director")
    readonly_fields = ("clasif_edad", "estreno")

    def estreno(self, obj):
        return obj.estreno

    estreno.short_description = "Estreno reciente"
