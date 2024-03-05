from django.contrib import admin

from apps.clientes.models import Cliente, ClienteFijo, Invalidacion


# Register your models here.
@admin.register(Cliente)
class ClienteFijoAdmin(admin.ModelAdmin):
    pass


@admin.register(ClienteFijo)
class ClienteFijoAdmin(admin.ModelAdmin):
    pass


@admin.register(Invalidacion)
class InvalidacionAdmin(admin.ModelAdmin):
    pass