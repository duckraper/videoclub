# Generated by Django 5.0.1 on 2024-03-06 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestamos', '0007_rename_fecha_entregado_solicitudprestamo_fecha_de_devolucion_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitudprestamo',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
