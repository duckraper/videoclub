from ..models import Cliente, ClienteFijo
from django.db import transaction


@transaction.atomic
def deshacer_fijo(cliente_fijo: ClienteFijo):
    cliente_fijo.delete()
    return
