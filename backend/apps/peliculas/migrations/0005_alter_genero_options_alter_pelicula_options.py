# Generated by Django 5.0.1 on 2024-03-02 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peliculas', '0004_genero_alter_pelicula_genero'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='genero',
            options={'ordering': ['nombre']},
        ),
        migrations.AlterModelOptions(
            name='pelicula',
            options={'ordering': ['fecha_estreno', 'titulo']},
        ),
    ]