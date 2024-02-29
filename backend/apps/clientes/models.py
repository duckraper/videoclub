from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

from apps.peliculas.models import GENEROS


class Cliente(models.Model):
    """
    Representa a una persona en el sistema.

    Atributos:
        - ci (int): El número de identificación único de la persona.
        - nombre (str): El nombre de la persona.
        - apellidos (str): El apellido de la persona.
        - edad (int): La edad de la persona.
        - direccion (str): La dirección de la persona.
        - videoclubs (ManyToManyField): Los videoclubs asociados con la persona.
    """
    class Meta:
        db_table = "cliente"

    ci = models.CharField(max_length=11, unique=True, validators=[
        RegexValidator(r'^\d{11}$', 'El CI debe tener 11 números sin letras')
    ])
    nombre = models.CharField(max_length=64)
    apellidos = models.CharField(max_length=64)
    edad = models.PositiveIntegerField(
        validators=[MaxValueValidator(120, 'La edad no puede ser mayor a 120')])
    provincia = models.CharField(max_length=64)
    direccion = models.CharField(max_length=64)
    telefono = models.CharField(max_length=8)

    activo = models.BooleanField(default=True)

    cant_soportes_alquilados = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(3)])

    def __str__(self):
        return self.nombre


class ClienteTemporal(models.Model):
    """
    Modelo que representa a un cliente temporal del videoclub.

    Atributos:
    - municipio: ForeignKey a la tabla Municipio, indica el municipio del cliente temporal.
    - telefono: CharField de longitud máxima 16, indica el número de teléfono del cliente temporal.
    - confianza: BooleanField, indica si el cliente temporal es de confianza o no.
    """

    class Meta:
        db_table = "cliente_temporal"

    persona = models.OneToOneField(
        Cliente, primary_key=True, on_delete=models.CASCADE)
    max_soportes_prestados = models.PositiveIntegerField(default=1)

    confianza = models.BooleanField(default=True)


class ClienteFijo(models.Model):
    """
    Modelo que representa a un cliente fijo del videoclub.

    Atributos:
    - max_soportes_prestados (PositiveIntegerField): El número máximo de soportes que puede prestar el cliente.
    - genero_favorito (ForeignKey): El género favorito del cliente.

    Meta:
    - db_table (str): El nombre de la tabla en la base de datos.
    """

    class Meta:
        db_table = "cliente_fijo"

    persona = models.OneToOneField(
        Cliente, primary_key=True, on_delete=models.CASCADE)

    genero_favorito = models.CharField(
        max_length=64, default="Indefinido", choices=GENEROS, null=True, blank=True)

    max_soportes_prestados = models.PositiveIntegerField(default=3)
