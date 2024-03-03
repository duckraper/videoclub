# Generated by Django 5.0.1 on 2024-03-03 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0008_alter_cliente_ci'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientefijo',
            name='max_soportes_prestados',
        ),
        migrations.AddField(
            model_name='cliente',
            name='confianza',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='cliente',
            name='max_soportes_prestados',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='provincia',
            field=models.CharField(choices=[('PRI', 'Pinar del Río'), ('ART', 'Artemisa'), ('LHA', 'La Habana'), ('MAY', 'Mayabeque'), ('MTZ', 'Matanzas'), ('CFG', 'Cienfuegos'), ('VCL', 'Villa Clara'), ('SSP', 'Sancti Spíritus'), ('CAV', 'Ciego de Ávila'), ('CMG', 'Camagüey'), ('LTU', 'Las Tunas'), ('GRA', 'Granma'), ('HOL', 'Holguín'), ('SCU', 'Santiago de Cuba'), ('GTM', 'Guantánamo')], max_length=64),
        ),
        migrations.DeleteModel(
            name='ClienteTemporal',
        ),
    ]
