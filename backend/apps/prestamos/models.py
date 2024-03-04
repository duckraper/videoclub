from typing import Literal
from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator
from datetime import date


class SolicitudPrestamo(models.Model):

    class Meta:
        verbose_name = "Solicitud de Préstamo"
        verbose_name_plural = "Solicitudes de Préstamo"
        db_table = "solicitud_prestamo"
        ordering = ["-fecha_de_prestamo"]

    empleado_que_solicita = models.ForeignKey(
        "authentication.User", on_delete=models.CASCADE, related_name="prestamos_realizados")
    cliente = models.ForeignKey(
        'clientes.Cliente', on_delete=models.CASCADE, related_name="prestamos")
    soporte_prestado = models.ForeignKey(
        'soportes.Soporte', related_name="prestamos", on_delete=models.CASCADE)

    costo_del_prestamo = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)], default=Decimal(0.01))

    fecha_de_prestamo = models.DateField(auto_now_add=True)
    dias_para_devolucion = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)])

    ha_sido_devuelto = models.BooleanField(default=False)
    fecha_entregado = models.DateField(null=True, blank=True)

    @property
    def recargo(self) -> Decimal:
        if self.ha_sido_devuelto and self.fecha_entregado:
            dias_de_retraso: int = (
                self.fecha_entregado - self.fecha_de_prestamo).days - self.dias_para_devolucion
        else:
            dias_de_retraso: int = (
                date.today() - self.fecha_de_prestamo).days - self.dias_para_devolucion

        if dias_de_retraso > 0:
            return Decimal(0.5) * self.costo_del_prestamo * dias_de_retraso

        return Decimal(0)

    # ========================== Calcular el costo del préstamo ========================== #

    def calcular_costo_del_prestamo(self) -> Decimal:
        costo = self.costo_base_del_prestamo()

        costo += self.costo_de_soporte()

        costo = self.aplicar_interes(costo)
        costo = self.aplicar_recargo(costo)

        return costo

    def costo_base_del_prestamo(self):
        return self.soporte_prestado.costo_adquisicion

    def costo_de_soporte(self):
        return self.soporte_prestado.costo_adquisicion + self.costo_de_peliculas()

    def costo_de_peliculas(self) -> Decimal | Literal[0]:
        return self.soporte_prestado.peliculas.aggregate(sum=models.Sum('precio'))['sum'] or 0

    def aplicar_interes(self, costo):
        return costo * self.dias_para_devolucion * Decimal(0.1)

    def aplicar_recargo(self, costo):
        return costo + self.recargo if self.recargo > 0 else costo

    # ======================= Fin de calcular el costo del préstamo ======================== #

    def has_changed(self, *fields):
        """
        Comprueba si alguno de los campos especificados de un objeto de modelo
        ha cambiado desde la última vez que se guardó en la base de datos
        """

        if self.pk is None:
            return True

        old_values = self.__class__.objects.filter(
            pk=self.pk).values(*fields)[0]

        return any(getattr(self, f) != old_values[f] for f in fields)

    def save(self, *args, **kwargs):
        if self.pk is None or self.has_changed('soporte_prestado', 'dias_para_devolucion', 'fecha_entregado'):
            self.costo_del_prestamo = self.calcular_costo_del_prestamo()

        super().save(*args, **kwargs)
