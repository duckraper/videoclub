from django.contrib import admin
from .models import SolicitudPrestamo


@admin.register(SolicitudPrestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha_prestamo',
                    'fecha_devolucion', 'cliente', 'soporte')
