from django.db import models
from decimal import Decimal

class SolicitudPrestamo(models.Model):
    class Meta:
        db_table = "solicitud_prestamo"

    cliente = models.ForeignKey(
        'clientes.Cliente', on_delete=models.CASCADE, related_name="prestamos")
    soporte = models.ForeignKey(
        'videoclub.Soporte', related_name="prestamos", on_delete=models.CASCADE)

    precio_prestamo = models.DecimalField(max_digits=5, decimal_places=2)

    fecha_prestamo = models.DateField(auto_now_add=True)
    fecha_devolucion = models.DateField()
    recargo = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal(0))
    devuelto = models.BooleanField(default=False)
    fecha_entregado = models.DateField(null=True, blank=True)
