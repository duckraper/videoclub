# Generated by Django 5.0.1 on 2024-03-02 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0004_alter_cliente_edad_alter_cliente_provincia_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cliente',
            options={'ordering': ['nombre', 'apellidos']},
        ),
    ]