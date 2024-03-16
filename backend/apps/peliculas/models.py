from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator
from datetime import date, timedelta


GENEROS = [
    ("Comedia", "Comedia"),
    ("Acción", "Acción"),
    ("Aventura", "Aventura"),
    ("Ciencia Ficción", "Ciencia Ficción"),
    ("Drama", "Drama"),
    ("Romance", "Romance"),
    ("Fantasía", "Fantasía"),
    ("Terror", "Terror"),
    ("Suspenso", "Suspenso"),
    ("Animación", "Animación"),
    ("Documental", "Documental"),
    ("Musical", "Musical"),
    ("Crimen", "Crimen"),
    ("Misterio", "Misterio"),
    ("Western", "Western"),
    ("Histórico", "Histórico"),
    ("Guerra", "Guerra"),
    ("Biografía", "Biografía"),
    ("Fantástico", "Fantástico"),
    ("Infantil", "Infantil"),
    ("Indie", "Indie"),
    ("Indefinido", "Indefinido")
]

CLASIFICACIONES = [
    ("A", "Apto para todo publico"),
    ("B", "Pelicula para niños mayores de 12"),
    ("C", "Pelicula para mayores de 16"),
    ("D", "Pelicula para mayores de 18")
]

PRECIO_BASE = Decimal(10.00)  # CUP


class Pelicula(models.Model):

    class Meta:
        db_table = "pelicula"
        ordering = ["fecha_estreno", "titulo"]

    titulo = models.CharField(max_length=64)
    genero = models.CharField(max_length=32, choices=GENEROS, default='Indefinido')

    duracion = models.IntegerField()  # duracion en mins
    director = models.CharField(max_length=64, default="Indefinido")
    clasif_edad = models.CharField(
        max_length=1, choices=CLASIFICACIONES, default="A")
    fecha_estreno = models.DateField(help_text="must be format: YYYY-MM-DD")

    tamanio = models.DecimalField(max_digits=3, decimal_places=1)  # GB'
    precio = models.DecimalField(
        # CUP'
        max_digits=10,  # To do: cambiar elanio que viene a 50 por la inflacion
        decimal_places=2,
        blank=True, null=True,
        default=PRECIO_BASE,
        validators=[MinValueValidator(Decimal(0.01))]
    )

    disponible = models.BooleanField(default=True)
    soportes = models.ManyToManyField(
        'soportes.Soporte', related_name="peliculas")

    @property
    def estreno(self):
        if self.fecha_estreno is None:
            return False
        
        return date.today() - self.fecha_estreno <= timedelta(days=20)

    def get_price(self):
        # TODO: implementar el calculo del precio de la pelicula
        precio = PRECIO_BASE

        if self.duracion <= 60:
            precio += 5
        elif self.duracion <= 120:
            precio += 10
        elif self.duracion <= 180:
            precio += 15
        else:
            precio += 20

        if self.estreno:
            return precio + precio/2

        return precio

    def save(self, *args, **kwargs):
        if not self.pk or not self.precio or self.precio == PRECIO_BASE:
            self.precio = self.get_price()

        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo}"
