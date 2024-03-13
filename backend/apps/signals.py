from django.db.models.signals import post_migrate
from django.contrib.auth.hashers import make_password
from datetime import datetime as dt
from django.dispatch import receiver
from django.apps import apps
import json
import codecs
from time import sleep


@receiver(post_migrate)
def poblar_con_usuarios(sender, **kwargs):
    if sender.name == "apps.authentication":
        User = apps.get_model("authentication", "User")

        with codecs.open('static/jsons/base_users.json', 'r', encoding='utf-8') as datos:
            users = json.load(datos)

        print("Poblando con usuarios:")
        count = 0
        for i, user in enumerate(users, start=1):
            # Hacer consulta que compruebe si el nombre de usuario o correo ya existe
            if User.objects.filter(username=user["username"]).exists() or\
                    User.objects.filter(email=user["email"]).exists():
                continue

            user, p_created = User.objects.get_or_create(
                username=user["username"],
                password=make_password(user["password"]),
                first_name=user["first_name"],
                last_name=user["last_name"],
                email=user["email"],
                is_staff=user['is_staff']
            )
            if p_created:
                count += 1
                print(f" {i}- {user}")
            user.save()
            sleep(0.5)

        if count == 0:
            print(' - No hay usuarios para agregar.')


@receiver(post_migrate)
def poblar_con_peliculas(sender, **kwargs):
    """Pobla la base de datos con peliculas, a partir de utils.peliculas.json"""
    if sender.name == "apps.peliculas":
        Pelicula = apps.get_model("peliculas", "Pelicula")

        with codecs.open('static/jsons/peliculas.json', 'r', encoding='utf-8') as datos:
            peliculas = json.load(datos)

        print("Poblando con peliculas:")
        count = 0
        for i, pelicula in enumerate(peliculas, start=1):
            genero = pelicula["genero"]

            pelicula, p_created = Pelicula.objects.get_or_create(
                tamanio=pelicula["tamanio"],
                titulo=pelicula["titulo"],
                genero=genero,
                fecha_estreno=dt.strptime(pelicula["fecha_estreno"], '%Y-%m-%d').date(),
                director=pelicula["director"],
                duracion=pelicula["duracion"],
                clasif_edad=pelicula["clasif_edad"]
            )
            if p_created:
                count += 1
                print(f" {i}- {pelicula}")
            pelicula.save()

        if count == 0:
            print(' - No hay peliculas para agregar.')


@receiver(post_migrate)
def poblar_con_clientes(sender, **kwargs):
    """Pobla la base de datos con clientes, a partir de utils.clientes.json"""
    if sender.name == "apps.clientes":
        Cliente = apps.get_model("clientes", "Cliente")

        with codecs.open('static/jsons/clientes.json', 'r', encoding='utf-8') as datos:
            clientes = json.load(datos)

        print("Poblando con clientes:")
        count = 0
        for i, cliente in enumerate(clientes, start=1):
            if Cliente.objects.filter(ci=cliente['ci']).exists():
                continue

            cliente, c_created = Cliente.objects.get_or_create(
                ci=cliente['ci'],
                nombre=cliente['nombre'],
                apellidos=cliente['apellidos'],
                direccion=cliente['direccion'],
                edad=cliente['edad'],
                provincia=cliente['provincia'],
                telefono=cliente['telefono']
            )
            if c_created:
                count += 1
                print(f" {i}- {cliente}")
            cliente.save()

        if count == 0:
            print(' - No hay clientes para agregar.')
