# Generated by Django 5.0.1 on 2024-03-06 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0014_alter_cliente_cant_soportes_alquilados'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='invalidacion',
            options={'ordering': ['fecha_invalidacion', 'cliente'], 'verbose_name_plural': 'Invalidaciones'},
        ),
    ]