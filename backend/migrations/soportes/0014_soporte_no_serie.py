# Generated by Django 5.0.3 on 2024-03-20 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soportes', '0013_soporte_soporte_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='soporte',
            name='no_serie',
            field=models.CharField(default='', editable=False, max_length=10, unique=True),
            preserve_default=False,
        ),
    ]
