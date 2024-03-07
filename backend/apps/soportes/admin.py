from django.contrib import admin
from .models import *

from apps.soportes.models import Casete, DVD, Soporte, VCD


@admin.register(Soporte)
class SoporteAdmin(admin.ModelAdmin):
    list_display = (
        "costo_adquisicion",
        "estado",
        "cant_peliculas_grabadas",
        "cant_max_peliculas",
        "cant_prestamos",
        "disponible",
    )
    list_filter = ("estado", "disponible")
    ordering = ("-cant_peliculas_grabadas", "costo_adquisicion", "estado")


@admin.register(DVD)
class DVDAdmin(admin.ModelAdmin):
    list_display = (
        "costo_adquisicion",
        "estado",
        "cant_peliculas_grabadas",
        "cant_max_peliculas",
        "cant_prestamos",
        "disponible",
        "capacidad",
        "formato_almacenamiento",
    )
    list_filter = ("estado", "disponible", "capacidad", "formato_almacenamiento")
    ordering = ("-cant_peliculas_grabadas", "costo_adquisicion", "estado")


@admin.register(VCD)
class VCDAdmin(admin.ModelAdmin):
    list_display = (
        "costo_adquisicion",
        "estado",
        "cant_peliculas_grabadas",
        "cant_max_peliculas",
        "cant_prestamos",
        "disponible",
        "marca",
    )
    list_filter = ("estado", "disponible", "marca")
    ordering = ("-cant_peliculas_grabadas", "costo_adquisicion", "estado")


@admin.register(Casete)
class CaseteAdmin(admin.ModelAdmin):
    list_display = (
        "costo_adquisicion",
        "estado",
        "cant_peliculas_grabadas",
        "cant_max_peliculas",
        "cant_prestamos",
        "disponible",
        "formato_cinta",
    )
    list_filter = ("estado", "disponible", "formato_cinta")
    ordering = ("-cant_peliculas_grabadas", "costo_adquisicion", "estado")

