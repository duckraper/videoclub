# Generated by Django 5.0.1 on 2024-03-02 21:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('peliculas', '0006_alter_pelicula_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='pelicula',
            options={'ordering': ['fecha_estreno', 'titulo']},
        ),
    ]