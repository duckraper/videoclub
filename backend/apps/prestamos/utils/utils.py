from ..models import SolicitudPrestamo
from apps.clientes.models import Cliente, ClienteFijo
from apps.soportes.models import Soporte
from django.db import transaction
from django.forms import ValidationError


@transaction.atomic
def crear_solicitud(cliente: Cliente | ClienteFijo, soporte: Soporte, dias: int = 3):
    """
    Funcion de apoyo para hacer tod el proceso que es crear una nueva solicitud de prestamo
    """

    if not cliente.cant_soportes_alquilados < cliente.max_soportes_prestados \
            or cliente.invalidado:
        raise ValidationError(f"El cliente {cliente} no puede alquilar más soportes")

    if not soporte.disponible:
        raise ValidationError(f"El soporte {soporte} no está disponible")

    prestamo = SolicitudPrestamo.objects.create(
        cliente=cliente,
        soporte=soporte,
        dias_para_devolucion=dias
    )

    cliente.prestamos.add(prestamo)
    cliente.cant_soportes_alquilados += 1
    cliente.save()

    soporte.cant_prestamos += 1
    soporte.prestamos.add(prestamo)
    soporte.disponible = False
    soporte.save()

    return prestamo


