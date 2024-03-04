# Generated by Django 5.0.1 on 2024-03-04 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0013_alter_clientefijo_genero_favorito'),
        ('peliculas', '0009_remove_pelicula_estreno_pelicula_disponible'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pelicula',
            name='genero',
            field=models.CharField(choices=[('Comedia', 'Comedia'), ('Acción', 'Acción'), ('Aventura', 'Aventura'), ('Ciencia Ficción', 'Ciencia Ficción'), ('Drama', 'Drama'), ('Romance', 'Romance'), ('Fantasía', 'Fantasía'), ('Terror', 'Terror'), ('Suspenso', 'Suspenso'), ('Animación', 'Animación'), ('Documental', 'Documental'), ('Musical', 'Musical'), ('Crimen', 'Crimen'), ('Misterio', 'Misterio'), ('Western', 'Western'), ('Histórico', 'Histórico'), ('Guerra', 'Guerra'), ('Biografía', 'Biografía'), ('Fantástico', 'Fantástico'), ('Infantil', 'Infantil'), ('Indie', 'Indie'), ('Indefinido', 'Indefinido')], default='Indefinido', max_length=32),
        ),
        migrations.DeleteModel(
            name='Genero',
        ),
    ]