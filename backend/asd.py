from apps.soportes.models import Soporte
from apps.clientes.models import Cliente
from apps.prestamos.models import SolicitudPrestamo


c = Cliente.objects.get(pk=5)
s = Soporte.objects.get(pk=9)

prestamo = SolicitudPrestamo.objects.create(
    cliente=c, soporte_prestado=s, dias_para_devolucion=5)

print(prestamo)
