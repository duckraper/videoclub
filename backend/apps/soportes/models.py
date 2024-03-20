from django.db import models
from django.core.validators import MinValueValidator as MinValue
from decimal import Decimal
from string import ascii_uppercase, digits
from secrets import choice

ESTADOS = [
    ("B", "Bien"),
    ("R", "Regular"),
    ("M", "Mal"),
    ("I", "Inutilizable")
]

FORMATO_CINTA = [
    ("VHS", "VHS"),
    ("Betamax", "Betamax"),
    ("Blu-ray", "Blu-ray")
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
        ordering = ["-cant_peliculas_grabadas", "estado", "costo_adquisicion"]
        indexes = [
            models.Index(fields=["disponible", "estado", "cant_peliculas_grabadas"], name="soporte_index"),
        ]

    no_serie = models.CharField(max_length=10, unique=True, editable=False)
    costo_adquisicion = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValue(0.01)])

    estado = models.CharField(max_length=1, choices=ESTADOS, default="B")

    cant_peliculas_grabadas = models.PositiveSmallIntegerField(
        default=0, blank=True)
    cant_max_peliculas = models.PositiveSmallIntegerField(
        default=1, blank=True)

    cant_prestamos = models.PositiveIntegerField(default=0, blank=True)

    disponible = models.BooleanField(default=True)

    @property
    def tipo_de_soporte(self):
        return

    def calcular_estado(self):
        """
        # Estado del soporte con base a su cantidad de usos (Habran otros factores que influyan)
        - 0-9 >= Bien
        - 10-19 >= Regular
        - 20-29 >= Mal
        - 30-...>= Inutilizable
        """

        return ESTADOS[self.cant_prestamos // 10][0] if self.cant_prestamos < 30 else "I"

    def generar_no_serie(self):
        return self.__class__.__name__[:3].upper() + ''.join(choice(ascii_uppercase + digits) for _ in range(6))

    def save(self, *args, **kwargs):
        if not self.no_serie:
            self.no_serie = self.generar_no_serie()

            while self.__class__.objects.filter(no_serie=self.no_serie).exists():
                self.no_serie = self.generar_no_serie()

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.no_serie


class Casete(Soporte):
    class Meta:
        db_table = "casete"

    formato_cinta = models.CharField(
        choices=FORMATO_CINTA, max_length=16)

    def save(self, *args, **kwargs):
        self.cant_max_peliculas = 1
        super().save(*args, **kwargs)

    def str(self):
        return self.formato_cinta.upper() + self.no_serie


class VCD(Soporte):
    class Meta:
        db_table = "vcd"

    marca = models.CharField(max_length=32, default="Indefinido")

    def save(self, *args, **kwargs):
        self.cant_max_peliculas = 1
        super().save(*args, **kwargs)


class DVD(Soporte):

    class Meta:
        db_table = "dvd"

    capacidad = models.DecimalField(
        max_digits=4, decimal_places=1, choices=TAMANIOS,)  # GB

    formato_almacenamiento = models.CharField(
        choices=FORMATOS_ALMACENAMIENTO, default="Dato", max_length=8)
