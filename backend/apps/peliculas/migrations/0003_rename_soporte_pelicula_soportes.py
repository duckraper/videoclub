# Generated by Django 5.0.1 on 2024-02-29 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peliculas', '0002_pelicula_disponible'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pelicula',
            old_name='soporte',
            new_name='soportes',
        ),
    ]