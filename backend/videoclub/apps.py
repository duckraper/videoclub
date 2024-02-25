from django.apps import AppConfig
from core import settings

if settings.DEBUG:
    from . import signals

class VideoclubConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'videoclub'
