from apps.clientes.models import Cliente, ClienteFijo


def parse_cliente(cliente: Cliente | ClienteFijo) -> Cliente | ClienteFijo:
    """
    Convierte un cliente dado, al tipo que le corresponde basandose en su FPK
    """
    if cliente.pk in ClienteFijo.objects.all().values_list('pk', flat=True):
        return ClienteFijo.objects.all().get(pk=cliente.pk)

    return cliente
