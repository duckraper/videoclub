# Generated by Django 5.0.1 on 2024-02-25 07:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoclub', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientetemporal',
            name='municipio',
        ),
        migrations.AddField(
            model_name='persona',
            name='municipio',
            field=models.ForeignKey(default=12, on_delete=django.db.models.deletion.CASCADE, to='videoclub.municipio'), #type: ignore
            preserve_default=False,
        ),
    ] # type: ignore
