from django.db import models


class Genero(models.Model):
    """
    Modelo que representa un género de películas.

    Atributos:
    - nombre: El nombre del género de películas.
    """
    class Meta:
        db_table = "genero"

    nombre = models.CharField(max_length=32)

    def __str__(self) -> str:
        return self.nombre


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

    tamanio = models.DecimalField(max_digits=2, decimal_places=1)  # GB'
    soporte = models.ManyToManyField(
        'videoclub.Soporte', related_name="peliculas")
    titulo = models.CharField(max_length=64)
    genero = models.ForeignKey(
        Genero,  on_delete=models.CASCADE, related_name="peliculas")
    anio = models.IntegerField()
    duracion = models.IntegerField()  # duracion en mins
    director = models.CharField(max_length=64, default="Indefinido")
    CLASIFICACIONES = [
        ("A", "Apto para todo publico"),
        ("B", "Pelicula para niños mayores de 12"),
        ("C", "Pelicula para mayores de 16"),
        ("D", "Pelicula para mayores de 18")
    ]
    clasif_edad = models.CharField(
        max_length=1, choices=CLASIFICACIONES, default="A")
    estreno = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.titulo} ({self.anio})"
