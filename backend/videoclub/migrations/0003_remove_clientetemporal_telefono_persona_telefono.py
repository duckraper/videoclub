# Generated by Django 5.0.1 on 2024-02-25 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoclub', '0002_remove_clientetemporal_municipio_persona_municipio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientetemporal',
            name='telefono',
        ),
        migrations.AddField(
            model_name='persona',
            name='telefono',
            field=models.CharField(default=0, max_length=8), #type: ignore
            preserve_default=False,
        ),
    ] #type: ignore
