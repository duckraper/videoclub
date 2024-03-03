# Generated by Django 5.0.1 on 2024-03-02 20:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientefijo',
            name='persona',
        ),
        migrations.RemoveField(
            model_name='clientetemporal',
            name='persona',
        ),
        migrations.AddField(
            model_name='clientefijo',
            name='cliente_ptr',
            field=models.OneToOneField(auto_created=True, default=0, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clientes.cliente'), # type: ignore
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='clientetemporal',
            name='cliente_ptr',
            field=models.OneToOneField(auto_created=True, default=0, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clientes.cliente'), # type: ignore
            preserve_default=False,
        ),
    ]
