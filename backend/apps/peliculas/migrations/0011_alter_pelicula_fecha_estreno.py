# Generated by Django 5.0.1 on 2024-03-04 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('peliculas', '0010_alter_pelicula_genero_delete_genero'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pelicula',
            name='fecha_estreno',
            field=models.DateField(blank=True, editable=False, help_text='must be format: YYYY-MM-DD', null=True),
        ),
    ]
