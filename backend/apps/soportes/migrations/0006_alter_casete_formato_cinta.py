# Generated by Django 5.0.1 on 2024-03-02 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soportes', '0005_alter_casete_formato_cinta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casete',
            name='formato_cinta',
            field=models.CharField(choices=[('VHS', 'VHS'), ('Betamax', 'Betamax'), ('Blu-ray', 'Blu-ray')], max_length=16),
        ),
    ]
