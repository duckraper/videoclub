from django.contrib import admin

from apps.clientes.models import Cliente, ClienteFijo, Invalidacion


# Register your models here.
@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = (
        "ci",
        "nombre_completo",
        "edad",
        "provincia",
        "telefono",
        "fecha_registro",
        "activo",
        "cant_soportes_alquilados",
        "max_soportes_prestados",
        "invalidado",
        "es_fijo",
    )
    readonly_fields = ("fecha_registro",)

    def nombre_completo(self, obj):
        return f"{obj.nombre} {obj.apellidos}"
    nombre_completo.short_description = "Nombre Completo"


@admin.register(ClienteFijo)
class ClienteFijoAdmin(ClienteAdmin):

    def get_queryset(self, request):
        # Filter the queryset to only show ClienteFijo instances
        qs = super().get_queryset(request).filter(pk__in=ClienteFijo.objects.all().values_list('pk', flat=True))
        return qs


@admin.register(Invalidacion)
class InvalidacionAdmin(admin.ModelAdmin):
    list_display = (
        "cliente",
        "fecha_invalidacion",
        "motivo",
    )
    date_hierarchy = "fecha_invalidacion"
    readonly_fields = ("fecha_invalidacion", "cliente")
