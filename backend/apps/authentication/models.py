from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        db_table = 'user'
        verbose_name = 'Usuario'
        verbose_name_plural = "Usuarios"
        indexes = [
            models.Index(fields=["username", "email"], name="user_idx")
        ]

    # ...
    email = models.EmailField(unique=True)
    #

    def save(self, *args, **kwargs):
        self.first_name = self.first_name.title()
        self.last_name = self.last_name.title()

        return super().save(*args, **kwargs)
