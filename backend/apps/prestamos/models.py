from typing import Literal
from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator
from datetime import date
from apps.clientes.models import ClienteFijo

PORCENTAJE_CLIENTE_FIJO = Decimal(0.1)
PORCENTAJE_POR_RETRASO = Decimal(0.5)
PRECIO_POR_DIA = Decimal(0.1)
DIAS_LIMITE_PARA_ENTREGA = 14


class SolicitudPrestamo(models.Model):
    class Meta:
        verbose_name = "Solicitud de Préstamo"
        verbose_name_plural = "Solicitudes de Préstamo"
        db_table = "solicitud_prestamo"
        ordering = ["-fecha_de_prestamo"]

    cliente = models.ForeignKey(
        'clientes.Cliente', on_delete=models.CASCADE, related_name="prestamos")
    soporte = models.ForeignKey(
        'soportes.Soporte', related_name="prestamos", on_delete=models.CASCADE)

    costo_del_prestamo = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)], default=Decimal(0.01))

    fecha_de_prestamo = models.DateField(auto_now_add=True)
    dias_para_devolucion = models.PositiveSmallIntegerField(default=3)

    ha_sido_devuelto = models.BooleanField(default=False)
    fecha_de_devolucion = models.DateField(null=True, blank=True)

    activo = models.BooleanField(default=True)

    # ============================= Comprobar si ya se vencio el prestamo ================== #

    @property
    def vencido(self):
        return ((date.today() - self.fecha_de_prestamo).days > self.dias_para_devolucion + DIAS_LIMITE_PARA_ENTREGA and
                not self.ha_sido_devuelto)

    # ================================ Calcular el recargo ================================= #

    @property
    def recargo(self) -> Decimal:

        if self.ha_sido_devuelto and self.fecha_de_devolucion:
            dias_de_retraso = (self.fecha_de_devolucion - self.fecha_de_prestamo).days - self.dias_para_devolucion
        else:
            dias_de_retraso = (date.today() - self.fecha_de_prestamo).days - self.dias_para_devolucion

        if dias_de_retraso > 0:
            return dias_de_retraso * (self.costo_del_prestamo + (self.costo_del_prestamo * PORCENTAJE_POR_RETRASO))

        return Decimal(0)

    # ======================== Calcular el costo total del préstamo ======================== #

    def calcular_costo_del_prestamo(self) -> Decimal:
        costo = self.costo_del_prestamo

        costo += self.costo_de_soporte()

        if self.dias_para_devolucion and self.fecha_de_prestamo:
            costo += self.aplicar_recargo()

        return costo - (costo * PORCENTAJE_CLIENTE_FIJO) if self.cliente.es_fijo else costo

    def costo_de_soporte(self):
        return self.soporte.costo_adquisicion + self.costo_de_peliculas()

    def costo_de_peliculas(self) -> Decimal | Literal[0]:
        return self.soporte.peliculas.aggregate(sum=models.Sum('precio'))['sum'] or 0

    def aplicar_recargo(self):
        return self.recargo

    # ======================= Fin de calcular el costo del préstamo ======================== #

    def has_changed(self, *fields):
        if self.pk is None:
            return True

        old_values = self.__class__.objects.filter(
            pk=self.pk).values(*fields)[0]

        print(old_values)

        return any(getattr(self, field) != old_values[field] for field in fields)

    def save(self, *args, **kwargs):
        if self.pk is None or \
                self.has_changed('ha_sido_devuelto', 'fecha_de_devolucion'):
            self.costo_del_prestamo = self.calcular_costo_del_prestamo()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Préstamo: {self.soporte} a {self.cliente} ${self.costo_del_prestamo} ({self.fecha_de_prestamo})"
