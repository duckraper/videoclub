# Generated by Django 5.0.1 on 2024-03-03 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peliculas', '0007_alter_pelicula_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pelicula',
            name='disponible',
        ),
    ]
