# Generated by Django 5.0.1 on 2024-03-02 20:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_remove_clientefijo_persona_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='provincia',
            field=models.CharField(choices=[('Pinar del Río', 'Pinar del Río'), ('Artemisa', 'Artemisa'), ('La Habana', 'La Habana'), ('Mayabeque', 'Mayabeque'), ('Matanzas', 'Matanzas'), ('Cienfuegos', 'Cienfuegos'), ('Villa Clara', 'Villa Clara'), ('Sancti Spíritus', 'Sancti Spíritus'), ('Ciego de Ávila', 'Ciego de Ávila'), ('Camagüey', 'Camagüey'), ('Las Tunas', 'Las Tunas'), ('Granma', 'Granma'), ('Holguín', 'Holguín'), ('Santiago de Cuba', 'Santiago de Cuba'), ('Guantánamo', 'Guantánamo')], max_length=64),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='telefono',
            field=models.CharField(max_length=8, validators=[django.core.validators.RegexValidator('^5\\d{7}$')]),
        ),
    ]
