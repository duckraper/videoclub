# Generated by Django 5.0.1 on 2024-03-07 06:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soportes', '0009_alter_soporte_estado'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='soporte',
            options={'ordering': ['cant_peliculas_grabadas', 'costo_adquisicion', 'estado']},
        ),
    ]
