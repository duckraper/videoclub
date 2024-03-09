from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4


class User(AbstractUser):
    class Meta:
        db_table = 'user'
        verbose_name = 'Usuario'
        verbose_name_plural = "Usuarios"

    # ...
    id = models.UUIDField(primary_key=True)
    email = models.EmailField(unique=True)
    # ...
