from decimal import Decimal
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class Dependiente(AbstractBaseUser):
    """
    Modelo que representa un usuario en el sistema.

    Atributos:
    - username (str): El nombre de usuario.
    - email (str): El correo electrónico del usuario.
    - password (str): La contraseña del usuario.
    - first_name (str): El primer nombre del usuario.
    - last_name (str): El apellido del usuario.
    - is_staff (bool): Indica si el usuario es miembro del personal.
    - is_active (bool): Indica si el usuario está activo.
    - date_joined (DateTime): La fecha en la que el usuario se unió.
    """
    class Meta:
        db_table = "usuario"

    username = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=64)
    is_staff = models.BooleanField(default=False, blank=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Provincia(models.Model):
    """
    Modelo de la tabla Provincia en la base de datos
    """
    class Meta:
        db_table = "provincia"

    nombre = models.CharField(max_length=32)

    def __str__(self) -> str:
        return self.nombre


class Municipio(models.Model):
    """
    Modelo de la tabla Municipio en la base de datos
    """
    class Meta:
        db_table = "municipio"

    nombre = models.CharField(max_length=32)
    provincia = models.ForeignKey(
        Provincia,
        on_delete=models.CASCADE,
        related_name="municipios"
    )

    def __str__(self):
        return f"{self.nombre}({self.provincia})"


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


class VideoClub(models.Model):
    """
    Representa un videoclub del pais.

    Atributos:
    - id (int): Identificador único del videoclub.
    - nombre (str): Nombre del videoclub.
    - municipio (Municipio): Municipio al que pertenece el videoclub.
    - direccion (str): Dirección del videoclub.
    - telefono (str): Número de teléfono del videoclub.
    - cant_soportes (int): Cantidad de soportes con los que cuenta
        actualmente el videclub.
    """

    class Meta:
        db_table = "videoclub"

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=64)
    telefono = models.CharField(max_length=16)
    cant_soportes = models.PositiveIntegerField(default=0, blank=True)

    def __str__(self) -> str:
        return f"{self.nombre}: {self.municipio.provincia.nombre}({self.municipio.nombre})"


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

    id = models.AutoField(primary_key=True)
    costo_adquisicion = models.DecimalField(max_digits=5, decimal_places=2)
    videoclub = models.ForeignKey(
        VideoClub, on_delete=models.CASCADE, null=False)

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

    id = models.CharField(primary_key=True, unique=True, max_length=255)
    tamanio = models.DecimalField(max_digits=2, decimal_places=1)  # GB
    soporte = models.ForeignKey(
        Soporte, on_delete=models.CASCADE, related_name="peliculas")
    titulo = models.CharField(max_length=64)
    genero = models.ForeignKey(
        Genero,  on_delete=models.CASCADE, related_name="peliculas")
    anio = models.IntegerField()
    duracion = models.IntegerField()  # duracion en mins
    director = models.CharField(max_length=64, default="Indefinido")
    CLASIFICACIONES = [
        ("A", "Apto para todo publico"),
        ("B", "Pelicula para ni\u00F1os mayores de 12"),
        ("C", "Pelicula para mayores de 16"),
        ("D", "Pelicula para mayores de 18")
    ]
    clasif_edad = models.CharField(
        max_length=1, choices=CLASIFICACIONES, default="A")
    estreno = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        """
        Guarda la película en la base de datos.

        Si la película no tiene un identificador único asignado,
        se genera uno basado en el número de películas en el soporte y
        el soporte contenedor.

        Args:
            *args: Argumentos posicionales adicionales.
            **kwargs: Argumentos de palabras clave adicionales.
        """
        if not self.pk:
            num_peliculas = self.soporte.cant_peliculas_grabadas
            letra = chr(ord('A') + num_peliculas)

            self.id = f"{self.soporte.pk}{letra}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo} ({self.anio})"


class Persona(models.Model):
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
        db_table = "persona"

    ci = models.CharField(max_length=11, unique=True, primary_key=True)
    nombre = models.CharField(max_length=64)
    apellidos = models.CharField(max_length=64)
    edad = models.IntegerField()
    direccion = models.CharField(max_length=64)

    videoclubs = models.ManyToManyField(VideoClub)

    def __str__(self):
        return self.nombre


class ClienteFijo(models.Model):
    """
    Modelo que representa a un cliente fijo del videoclub.

    Atributos:
    - max_soportes_prestados (PositiveIntegerField): El número máximo de soportes que puede prestar el cliente.
    - genero_favorito (ForeignKey): El género favorito del cliente.

    Meta:
    - db_table (str): El nombre de la tabla en la base de datos.
    - db_table_comment (str): Un comentario sobre la tabla en la base de datos.
    """

    class Meta:
        db_table = "cliente_fijo"

    persona = models.OneToOneField(
        Persona, primary_key=True, on_delete=models.CASCADE)

    max_soportes_prestados = models.PositiveIntegerField(default=3)
    cant_soportes_alquilados = models.PositiveIntegerField(default=0)

    genero_favorito = models.ForeignKey(
        Genero, on_delete=models.DO_NOTHING, related_name="preferido_por")


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
        Persona, primary_key=True, on_delete=models.CASCADE)

    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=8)
    confianza = models.BooleanField(default=True)


class SolicitudPrestamo(models.Model):
    class Meta:
        db_table = "solicitud_prestamo"

    cliente = models.ForeignKey(
        Persona, on_delete=models.CASCADE, related_name="solicitudes")
    soporte = models.ForeignKey(Soporte, on_delete=models.CASCADE)

    precio_prestamo = models.DecimalField(max_digits=5, decimal_places=2)
    fecha_prestamo = models.DateField(auto_now_add=True)
    fecha_devolucion = models.DateField()
    recargo = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal(0))
    devuelto = models.BooleanField(default=False)
    fecha_entregado = models.DateField(null=True, blank=True)