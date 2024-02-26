from django.db import models


class Soporte(models.Model):
    """
    Representa un soporte en el videoclub.

    Atributos:
    - id: Identificador único del soporte.
    - costo_adquisicion: Costo del soporte.
    - videoclub (FK): Videoclub al que pertenece el soporte.
    - estado: Estado del soporte (Bien, Mal, Regular).
    - cant_peliculas: Cantidad de películas en el soporte.
    """
    class Meta:
        db_table = "soporte"

    costo_adquisicion = models.DecimalField(max_digits=5, decimal_places=2)

    ESTADOS = [
        ("B", "Bien"),
        ("M", "Mal"),
        ("R", "Regular")
    ]
    estado = models.CharField(max_length=1, choices=ESTADOS, default="B")

    cant_peliculas_grabadas = models.PositiveIntegerField(
        default=0, blank=True)
    cant_prestamos = models.PositiveIntegerField(default=0)
    disponible = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Soporte {self.pk}"


class Casete(Soporte):
    """
    Clase que representa un casete en el videoclub.

    Atributos:
    - formato_cinta: El formato del casete (por defecto es "VHS").
    - cant_peliculas: La cantidad de películas en el casete (por defecto es 0).
    """

    class Meta:
        db_table = "casete"

    formato_cinta = models.CharField(max_length=32, default="VHS")
    cant_peliculas = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return f"Casete {self.formato_cinta}"


class VCD(Soporte):
    """
    Modelo que representa un VCD en el videoclub.

    Atributos:
    - marca: la marca del VCD (cadena de caracteres).
    """

    class Meta:
        db_table = "vcd"

    marca = models.CharField(max_length=32, default="Indefinido")

    def __str__(self):
        return f"VCD {self.marca}"


class DVD(Soporte):
    """
    Representa un DVD en el videoclub.

    Atributos:
    - tamanio: El tamaño del DVD en GB. (4.7GB o 8.5GB)
    - formato_almacenamiento: El formato del DVD (Dato o DVDVideo).
    """

    class Meta:
        db_table = "dvd"

    TAMANIOS = [
        (4.7, '4.7 GB'),
        (8.5, '8.5 GB'),
    ]
    tamanio = models.DecimalField(
        max_digits=4, decimal_places=1, choices=TAMANIOS)  # GB

    FORMATOS = [
        ("Dato", "Dato"),
        ("DVDVideo", "DVDVideo")
    ]
    formato_almacenamiento = models.CharField(
        choices=FORMATOS, default="Dato", max_length=8)

    def __str__(self):
        return f"DVD {self.formato_almacenamiento}"
