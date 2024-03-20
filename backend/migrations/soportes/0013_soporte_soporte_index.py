# Generated by Django 5.0.3 on 2024-03-18 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soportes', '0012_alter_soporte_options'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='soporte',
            index=models.Index(fields=['disponible', 'estado', 'cant_peliculas_grabadas'], name='soporte_index'),
        ),
    ]