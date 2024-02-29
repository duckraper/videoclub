from django.db import models
from decimal import Decimal
# importo los validadores
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import date, timedelta, datetime

from apps import soportes

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
    ("Infantil", "Infantil")
]

CLASIFICACIONES = [
    ("A", "Apto para todo publico"),
    ("B", "Pelicula para niños mayores de 12"),
    ("C", "Pelicula para mayores de 16"),
    ("D", "Pelicula para mayores de 18")
]

PRECIO_BASE = Decimal(10.00)  # CUP


class Pelicula(models.Model):
    """
    # Modelo que representa una película en el soportes.

    ## Atributos:
        - tamanio (Decimal): El tamaño de la película en GB.
        - soportes (ForeignKey): Soportes a los que pertenece la película.
        - titulo (str): El título de la película.
        - genero (str): El género al que pertenece la película.
        - fecha_estreno (Date): Fecha de lanzamiento de la película.
        - duracion (int): La duración de la película en minutos.
        - director (str): El director de la película.
        - precio (Decimal): El precio base de la pelicula
        - clasif_edad (str): La clasificación de edad de la película.
        - estreno (bool): Indica si la película es un estreno o no.
    """

    class Meta:
        db_table = "pelicula"

    titulo = models.CharField(max_length=64)
    genero = models.CharField(
        max_length=64, default="Indefinido", choices=GENEROS)
    duracion = models.IntegerField()  # duracion en mins
    director = models.CharField(max_length=64, default="Indefinido")
    clasif_edad = models.CharField(
        max_length=1, choices=CLASIFICACIONES, default="A", editable=False)
    fecha_estreno = models.DateField(
        editable=False, help_text="must be format: YYYY-MM-DD")

    estreno = models.BooleanField(blank=True, null=True, default=None)

    tamanio = models.DecimalField(max_digits=3, decimal_places=1)  # GB'
    precio = models.DecimalField(
        # CUP'
        max_digits=10,  # To do: cambiar el anio que viene a 50 por la inflacion
        decimal_places=2,
        blank=True, null=True,
        default=PRECIO_BASE,
        validators=[MinValueValidator(Decimal(0.01))]
    )

    soportes = models.ManyToManyField(
        'soportes.Soporte', related_name="peliculas")

    disponible = models.BooleanField(default=True, blank=True)

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
        # definir si la pelicula es estreno o no
        if self.estreno == None:
            fecha_estreno = datetime.strptime(
                str(self.fecha_estreno), "%Y-%m-%d").date()
            if date.today() - fecha_estreno <= timedelta(days=20):
                self.estreno = True
            else:
                self.estreno = False

        # asignar precio a la pelicula
        if not self.precio or self.precio == PRECIO_BASE:
            self.precio = self.get_price()

        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo}"
