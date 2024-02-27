from typing import Literal
from django.db import models

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


class Pelicula(models.Model):
    """
    Modelo que representa una película en el videoclub.

    Atributos:
        id (str): El identificador único de la película.
        tamanio (Decimal): El tamaño de la película en GB.
        soporte (ForeignKey): El soporte al que pertenece la película.
        titulo (str): El título de la película.
        genero (ForeignKey): El género al que pertenece la película.
        anio (int): El año de lanzamiento de la película.
        duracion (int): La duración de la película en minutos.
        director (str): El director de la película.
        clasif_edad (str): La clasificación de edad de la película.
        estreno (bool): Indica si la película es un estreno o no.
    """

    class Meta:
        db_table = "pelicula"

    titulo = models.CharField(max_length=64)
    genero = models.CharField(
        max_length=64, default="Indefinido", choices=GENEROS)
    anio = models.IntegerField()
    duracion = models.IntegerField()  # duracion en mins
    director = models.CharField(max_length=64, default="Indefinido")

    clasif_edad = models.CharField(
        max_length=1, choices=CLASIFICACIONES, default="A")
    
    estreno = models.BooleanField(default=False)

    tamanio = models.DecimalField(max_digits=2, decimal_places=1)  # GB'

    soporte = models.ManyToManyField(
        'videoclub.Soporte', related_name="peliculas")

    def __str__(self):
        return f"{self.titulo} ({self.anio})"
