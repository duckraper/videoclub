from .models import ClienteFijo, Cliente


def parseCliente(cliente: Cliente | ClienteFijo) -> Cliente | ClienteFijo:
    """
    Convierte un cliente dado, a el tipo que le corresponde basandose en su FPK
    """
    if cliente.pk in ClienteFijo.objects.all().values_list('pk', flat=True):
        return ClienteFijo.objects.all().get(pk=cliente.pk)

    return cliente
