# Generated by Django 5.0.1 on 2024-03-06 05:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0013_alter_clientefijo_genero_favorito'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='cant_soportes_alquilados',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3, 'No puede alquilar más de 3 soportes')]),
        ),
    ]
