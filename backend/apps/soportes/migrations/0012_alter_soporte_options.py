# Generated by Django 5.0.1 on 2024-03-07 06:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soportes', '0011_alter_soporte_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='soporte',
            options={'ordering': ['-cant_peliculas_grabadas', 'estado', 'costo_adquisicion']},
        ),
    ]
