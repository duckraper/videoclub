import codecs
import json
from datetime import datetime as dt, date

from django.test import TestCase

from .models import SolicitudPrestamo
from apps.soportes.models import Soporte, Casete, VCD, DVD
from apps.clientes.models import Cliente, ClienteFijo, Invalidacion
from apps.peliculas.models import Pelicula
from .utils import crear_solicitud, devolucion, invalidar
from decimal import Decimal


class SolicitudPrestamoTestCase(TestCase):
    def setUp(self):
        self.c = Cliente.objects.create(
            ci="14110276483",
            nombre="Abelardo",
            apellidos="Salome",
            edad=21,
            provincia="CMG",
            direccion="Calle A/ 1 y 2 #89",
            telefono="52999999"
        )

        self.cf = ClienteFijo.objects.create(
            ci="12022810901",
            nombre="Luis Javier",
            apellidos="Ramirez",
            edad=21,
            provincia="MTZ",
            direccion="Calle 1 # 2",
            telefono="52999999",
            genero_favorito="Terror"
        )

        self.s1 = Casete.objects.create(
            costo_adquisicion=Decimal(150.00),
            formato_cinta="Blu-ray"
        )

        self.s2 = VCD.objects.create(
            costo_adquisicion=Decimal(120.00),
            marca="Sony"
        )

        self.s3 = DVD.objects.create(
            costo_adquisicion=Decimal(100.00),
            formato_almacenamiento="DVDVideo",
            capacidad=Decimal(4.7)
        )

        self.s4 = DVD.objects.create(
            costo_adquisicion=Decimal(180.00),
            formato_almacenamiento="DVDVideo",
            capacidad=Decimal(8.5)
        )

        self.s5 = DVD.objects.create(
            costo_adquisicion=Decimal(200.00),
            formato_almacenamiento="Dato",
            capacidad=Decimal(4.7)
        )

        # self._cargar_peliculas()

        self.s1.peliculas.add(Pelicula.objects.get(pk=1))
        self.s2.peliculas.add(Pelicula.objects.get(pk=2))
        self.s3.peliculas.add(Pelicula.objects.get(pk=3))
        self.s3.peliculas.add(Pelicula.objects.get(pk=4))
        self.s4.peliculas.add(Pelicula.objects.get(pk=5))
        self.s4.peliculas.add(Pelicula.objects.get(pk=6))
        self.s4.peliculas.add(Pelicula.objects.get(pk=7))
        self.s4.peliculas.add(Pelicula.objects.get(pk=8))
        self.s5.peliculas.add(Pelicula.objects.get(pk=9))
        self.s5.peliculas.add(Pelicula.objects.get(pk=10))

        self.sp1 = crear_solicitud(self.c, self.s4, 5)
        self.sp2 = crear_solicitud(self.cf, self.s2),

    @staticmethod
    def _cargar_peliculas():
        with codecs.open('static/jsons/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        for i, pelicula in enumerate(peliculas, start=1):
            pelicula, p_created = Pelicula.objects.get_or_create(
                tamanio=pelicula["tamanio"],
                titulo=pelicula["titulo"],
                genero=pelicula["genero"],
                fecha_estreno=dt.strptime(pelicula["fecha_estreno"], '%Y-%m-%d').date(),
                director=pelicula["director"],
                duracion=pelicula["duracion"],
                clasif_edad=pelicula["clasif_edad"]
            )

    def test_crear_solicitud_prestamo(self):
        self.assertEqual(self.sp1.cliente, self.c)
        self.assertEqual(self.sp1.soporte, self.s1)
        self.assertEqual(self.sp1.dias_para_devolucion, 5)
        self.assertEqual(self.sp1.ha_sido_devuelto, False)
        self.assertEqual(self.sp1.fecha_de_devolucion, None)

        self.assertEqual(self.sp2.cliente, self.cf)
        self.assertEqual(self.sp2.soporte, self.s2)
        self.assertEqual(self.sp2.dias_para_devolucion, 5)
        self.assertEqual(self.sp2.ha_sido_devuelto, False)
        self.assertEqual(self.sp2.fecha_de_devolucion, None)

    def test_cambio_de_costo(self):
        a1 = self.sp1.costo_del_prestamo

        self.sp1.ha_sido_devuelto = True
        self.sp1.fecha_de_devolucion = date(2025, 2, 16)
        self.sp1.save()

        self.assertNotEqual(a1, self.sp1.costo_del_prestamo)

        a = self.sp1.costo_del_prestamo

        self.sp1.save()

        self.assertEqual(a, self.sp1.costo_del_prestamo)