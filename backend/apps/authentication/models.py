import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        db_table = 'user'
        verbose_name = 'Usuario'
        verbose_name_plural = "Usuarios"

    # ...
    email = models.EmailField(unique=True)
    # ...
