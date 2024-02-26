from django.apps import AppConfig
from .signals import poblar_con_generos, poblar_con_peliculas


class PeliculasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'peliculas'
