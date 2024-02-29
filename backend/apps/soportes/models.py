from unicodedata import decimal
from django.db import models
from django.core.validators import MinValueValidator as MinValue
from decimal import Decimal

ESTADOS = [
    ("B", "Bien"),
    ("M", "Mal"),
    ("R", "Regular")
]

FORMATO_CINTA = [
    ("VHS", "VHS"),
    ("Betamax", "Betamax"),
    ("VHS-C", "VHS-C"),
    ("Video8", "Video8"),
    ("Hi8", "Hi8"),
    ("Digital8", "Digital8"),
    ("MiniDV", "MiniDV"),
    ("MicroMV", "MicroMV"),
    ("Blu-ray", "Blu-ray"),
    ("UHD Blu-ray", "UHD Blu-ray")
]

FORMATOS_ALMACENAMIENTO = [
    ("Dato", "Dato"),
    ("DVDVideo", "DVDVideo")
]

TAMANIOS = [
    (round(Decimal(4.7), 1), '4.7 GB'),
    (round(Decimal(8.5), 1), '8.5 GB'),
]


class Soporte(models.Model):
    class Meta:
        db_table = "soporte"

    costo_adquisicion = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValue(0.01)])

    estado = models.CharField(max_length=1, choices=ESTADOS, default="B")

    cant_peliculas_grabadas = models.PositiveSmallIntegerField(
        default=0, blank=True)
    cant_max_peliculas = models.PositiveSmallIntegerField(
        default=1, blank=True)

    cant_prestamos = models.PositiveIntegerField(default=0, blank=True)

    disponible = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"Soporte {self.pk}"


class Casete(Soporte):
    class Meta:
        db_table = "casete"

    formato_cinta = models.CharField(
        choices=FORMATO_CINTA, max_length=16)

    def save(self, *args, **kwargs):
        self.cant_max_peliculas = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Casete {self.formato_cinta}"


class VCD(Soporte):
    class Meta:
        db_table = "vcd"

    marca = models.CharField(max_length=32, default="Indefinido")

    def save(self, *args, **kwargs):
        self.cant_max_peliculas = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"VCD {self.marca}"


class DVD(Soporte):

    class Meta:
        db_table = "dvd"

    capacidad = models.DecimalField(
        max_digits=4, decimal_places=1, choices=TAMANIOS,)  # GB

    formato_almacenamiento = models.CharField(
        choices=FORMATOS_ALMACENAMIENTO, default="Dato", max_length=8)

    def __str__(self):
        return f"DVD {self.formato_almacenamiento}"
