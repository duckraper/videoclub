from django.contrib import admin
from .models import SolicitudPrestamo

from apps.prestamos.models import SolicitudPrestamo


@admin.register(SolicitudPrestamo)
class SolicitudPrestamoAdmin(admin.ModelAdmin):
    pass