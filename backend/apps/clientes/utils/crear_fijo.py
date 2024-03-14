from django.db import transaction
from ..models import Cliente, ClienteFijo, Invalidacion


@transaction.atomic
def crear_fijo(cliente: Cliente | ClienteFijo, genero: str = None) -> Cliente | ClienteFijo:

    if cliente.invalidado:
        invalidacion = Invalidacion.objects.get(pk=cliente.pk)
        invalidacion.delete()

    genero = genero if genero is not None or genero == "" else "Indefinido"

    cliente_fijo, created = ClienteFijo.objects.get_or_create(
        cliente_id=cliente.pk,
        genero_favorito=genero
    )

    return cliente_fijo if created else cliente

