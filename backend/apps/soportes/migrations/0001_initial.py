# Generated by Django 5.0.1 on 2024-02-29 05:28

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Soporte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('costo_adquisicion', models.DecimalField(decimal_places=2, max_digits=5, validators=[django.core.validators.MinValueValidator(0.01)])),
                ('estado', models.CharField(choices=[('B', 'Bien'), ('M', 'Mal'), ('R', 'Regular')], default='B', max_length=1)),
                ('cant_peliculas_grabadas', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('cant_max_peliculas', models.PositiveSmallIntegerField(blank=True, default=1)),
                ('cant_prestamos', models.PositiveIntegerField(blank=True, default=0)),
                ('disponible', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'soporte',
            },
        ),
        migrations.CreateModel(
            name='Casete',
            fields=[
                ('soporte_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='soportes.soporte')),
                ('formato_cinta', models.CharField(choices=[('VHS', 'VHS'), ('Betamax', 'Betamax'), ('VHS-C', 'VHS-C'), ('Video8', 'Video8'), ('Hi8', 'Hi8'), ('Digital8', 'Digital8'), ('MiniDV', 'MiniDV'), ('MicroMV', 'MicroMV'), ('Blu-ray', 'Blu-ray'), ('UHD Blu-ray', 'UHD Blu-ray')], default='VHS', editable=False, max_length=16)),
            ],
            options={
                'db_table': 'casete',
            },
            bases=('soportes.soporte',),
        ),
        migrations.CreateModel(
            name='DVD',
            fields=[
                ('soporte_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='soportes.soporte')),
                ('tamanio', models.DecimalField(choices=[(4.7, '4.7 GB'), (8.5, '8.5 GB')], decimal_places=1, max_digits=4)), #type: ignore
                ('formato_almacenamiento', models.CharField(choices=[('Dato', 'Dato'), ('DVDVideo', 'DVDVideo')], default='Dato', max_length=8)),
            ],
            options={
                'db_table': 'dvd',
            },
            bases=('soportes.soporte',),
        ),
        migrations.CreateModel(
            name='VCD',
            fields=[
                ('soporte_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='soportes.soporte')),
                ('marca', models.CharField(default='Indefinido', max_length=32)),
            ],
            options={
                'db_table': 'vcd',
            },
            bases=('soportes.soporte',),
        ),
    ]