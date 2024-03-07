from django.contrib import admin
from .models import SolicitudPrestamo


@admin.register(SolicitudPrestamo)
class SolicitudPrestamoAdmin(admin.ModelAdmin):
    list_display = (
        "cliente",
        "soporte",
        "costo_del_prestamo",
        "fecha_de_prestamo",
        "dias_para_devolucion",
        "ha_sido_devuelto",
        "fecha_de_devolucion",
        "activo",
    )
    list_filter = ("cliente", "soporte", "ha_sido_devuelto", "activo")
    search_fields = ("cliente__nombre", "soporte__nombre")
    readonly_fields = ("fecha_de_prestamo",)
    date_hierarchy = "fecha_de_prestamo"

    def has_delete_permission(self, request, obj=None):
        return False

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.fecha_de_prestamo = timezone.now()
        super().save_model(request, obj, form, change)


