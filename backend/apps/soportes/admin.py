from django.contrib import admin
from .models import *

from apps.soportes.models import Casete, DVD, Soporte, VCD


@admin.register(Casete)
class DVDAdmin(admin.ModelAdmin):
    pass


@admin.register(DVD)
class DVDAdmin(admin.ModelAdmin):
    pass


@admin.register(Soporte)
class VCDAdmin(admin.ModelAdmin):
    pass


@admin.register(VCD)
class VCDAdmin(admin.ModelAdmin):
    pass