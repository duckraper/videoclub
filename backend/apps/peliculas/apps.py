from django.apps import AppConfig


class PeliculasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.peliculas'

    def ready(self) -> None:
        from .signals import eliminar_peliculas_repetidas

        return super().ready()
