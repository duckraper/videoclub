from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from datetime import datetime as dt
from ..peliculas.models import GENEROS

PROVINCIAS = [
    ("PRI", "Pinar del Río"),
    ("ART", "Artemisa"),
    ("HAB", "La Habana"),
    ("MAY", "Mayabeque"),
    ("MTZ", "Matanzas"),
    ("CFG", "Cienfuegos"),
    ("VCL", "Villa Clara"),
    ("SSP", "Sancti Spíritus"),
    ("CAV", "Ciego de Ávila"),
    ("CMG", "Camagüey"),
    ("LTU", "Las Tunas"),
    ("GRA", "Granma"),
    ("HOL", "Holguín"),
    ("SCU", "Santiago de Cuba"),
    ("GTM", "Guantánamo")
]


class Cliente(models.Model):
    class Meta:
        db_table = "cliente"
        ordering = ["nombre", "apellidos"]

    ci = models.CharField(
        max_length=11,
        unique=True,
        validators=[
            RegexValidator(r"^(?:[0-9]{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}$",
                           'El CI debe tener 11 números sin letras')
        ],
        blank=False,
        null=False
    )

    nombre = models.CharField(max_length=64)
    apellidos = models.CharField(max_length=64)
    edad = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(120, 'La edad no puede ser mayor a 120'),
            MinValueValidator(18, 'La edad no puede ser menor a 18')]
    )
    provincia = models.CharField(max_length=64, choices=PROVINCIAS)
    direccion = models.CharField(max_length=64)

    telefono = models.CharField(
        max_length=8, blank=True, null=True,
        validators=[
            RegexValidator(r'^5\d{7}$', 'El teléfono debe tener 8 números y empezar con 5')]
    )

    fecha_registro = models.DateField(auto_now_add=True, editable=False)
    activo = models.BooleanField(default=True)

    cant_soportes_alquilados = models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(3, 'No puede alquilar más de 3 soportes')
        ]
    )

    max_soportes_prestados = models.PositiveIntegerField(default=1)

    def invalidar(self, motivo: str = None):
        invalidacion = Invalidacion.objects.create(
            cliente=self,
            motivo=motivo if motivo else None,
            fecha_invalidacion=dt.today().date()
        )

        return invalidacion

    @property
    def invalidado(self):
        return hasattr(self, "invalidacion")

    @property
    def es_fijo(self):
        return self.pk in ClienteFijo.objects.all().values_list('pk', flat=True)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"


class ClienteFijo(Cliente):
    class Meta:
        db_table = "cliente_fijo"

    genero_favorito = models.CharField(max_length=32, choices=GENEROS, default='Indefinido')

    def save(self, *args, **kwargs):
        if not self.pk:
            self.max_soportes_prestados = 3

        return super().save(*args, **kwargs)


class Invalidacion(models.Model):
    class Meta:
        db_table = "invalidado"
        ordering = ["fecha_invalidacion", "cliente"]
        verbose_name_plural = "Invalidaciones"

    cliente = models.OneToOneField(
        Cliente, on_delete=models.CASCADE, primary_key=True)

    fecha_invalidacion = models.DateField(auto_now_add=True, editable=False)
    motivo = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.cliente} - {self.fecha_invalidacion}"
