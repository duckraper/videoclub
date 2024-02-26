from django.contrib import admin
from .models import *


@admin.register(DVD)
class DVDAdmin(admin.ModelAdmin):
    list_display = ('id', 'tamanio', 'formato_almacenamiento')


@admin.register(Casete)
class CaseteAdmin(admin.ModelAdmin):
    list_display = ('id', 'formato_cinta', 'cant_peliculas')


@admin.register(VCD)
class VCDAdmin(admin.ModelAdmin):
    list_display = ('id', 'marca')
