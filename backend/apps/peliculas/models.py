from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator
from datetime import date, timedelta, datetime


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


class Genero(models.Model):

    class Meta:
        db_table = "genero"
        ordering = ["nombre"]

    nombre = models.CharField(max_length=64, unique=True, choices=GENEROS)

    def __str__(self):
        return f"{self.nombre}"


class Pelicula(models.Model):

    class Meta:
        db_table = "pelicula"
        ordering = ["fecha_estreno", "titulo"]

    titulo = models.CharField(max_length=64)
    genero = models.ForeignKey(
        Genero, on_delete=models.CASCADE, related_name="peliculas")
    
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
