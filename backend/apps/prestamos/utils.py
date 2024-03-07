from .models import SolicitudPrestamo
from apps.clientes.models import Cliente, ClienteFijo, Invalidacion
from apps.soportes.models import Soporte

from datetime import datetime as dt


def invalidar(cliente: Cliente | ClienteFijo, motivo: str = None) -> Invalidacion:
    invalidacion = Invalidacion.objects.create(
        cliente=cliente,
        motivo=motivo if motivo else None,
        fecha_invalidacion=dt.today().date()
    )

    return invalidacion


def crear_solicitud(cliente: Cliente | ClienteFijo, soporte: Soporte, dias: int = 3):
    if not cliente.cant_soportes_alquilados < cliente.max_soportes_prestados\
            or cliente.invalidado:
        raise Exception(f"El cliente {cliente} no puede alquilar más soportes")

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


def devolucion(prestamo: SolicitudPrestamo, fecha=None):
    if fecha is None:
        fecha = dt.today().date()

    prestamo.ha_sido_devuelto = True
    prestamo.fecha_de_devolucion = fecha
    prestamo.activo = False
    prestamo.save()

    prestamo.cliente.cant_soportes_alquilados -= 1
    prestamo.cliente.save()

    prestamo.soporte.estado = prestamo.soporte.calcular_estado()
    prestamo.soporte.disponible = True
    prestamo.soporte.save()
