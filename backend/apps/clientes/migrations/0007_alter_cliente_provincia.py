# Generated by Django 5.0.1 on 2024-03-03 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0006_cliente_fecha_registro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='provincia',
            field=models.CharField(choices=[('PRI', 'Pinar del Río'), ('ART', 'Artemisa'), ('LHA', 'La Habana'), ('MAY', 'Mayabeque'), ('MTZ', 'Matanzas'), ('CFG', 'Cienfuegos'), ('VCL', 'Villa Clara'), ('SSP', 'Sancti Spíritus'), ('CAV', 'Ciego de Ávila'), ('CMG', 'Camagüey'), ('LTU', 'Las Tunas'), ('GRA', 'Granma'), ('HOL', 'Holguín'), ('SCU', 'Santiago de Cuba'), ('GTM', 'Guantánamo')], error_messages={'invalid_choice': "La provincia seleccionada no es válida, seleccione una de las siguientes:\n                                [('PRI', 'Pinar del Río'), ('ART', 'Artemisa'), ('LHA', 'La Habana'), ('MAY', 'Mayabeque'), ('MTZ', 'Matanzas'), ('CFG', 'Cienfuegos'), ('VCL', 'Villa Clara'), ('SSP', 'Sancti Spíritus'), ('CAV', 'Ciego de Ávila'), ('CMG', 'Camagüey'), ('LTU', 'Las Tunas'), ('GRA', 'Granma'), ('HOL', 'Holguín'), ('SCU', 'Santiago de Cuba'), ('GTM', 'Guantánamo')]"}, max_length=64),
        ),
    ]