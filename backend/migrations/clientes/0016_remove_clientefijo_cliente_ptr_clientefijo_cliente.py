# Generated by Django 5.0.3 on 2024-03-13 21:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0015_alter_invalidacion_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientefijo',
            name='cliente_ptr',
        ),
        migrations.AddField(
            model_name='clientefijo',
            name='cliente',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='clientes.cliente'),
            preserve_default=False,
        ),
    ]
