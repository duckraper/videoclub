from django.db import transaction
from ..models import Cliente, ClienteFijo


# TODO: eliminar un cliente fijo si se pone en falso 'es_fijo'
@transaction.atomic
def crear_fijo(cliente: Cliente, genero: str = None):
    cliente.delete()

    genero = genero if genero is not None or genero == "" else "Indefinido"

    cliente_fijo, created = ClienteFijo.objects.get_or_create(
        ci=cliente.ci,
        nombre=cliente.nombre,
        apellidos=cliente.apellidos,
        edad=cliente.edad,
        provincia=cliente.provincia,
        direccion=cliente.direccion,
        telefono=cliente.telefono,
        fecha_registro=cliente.fecha_registro,
        activo=cliente.activo,
        cant_soportes_alquilados=cliente.cant_soportes_alquilados,
        genero_favorito=genero
    )

    return cliente_fijo if created else cliente

