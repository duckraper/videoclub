# Generated by Django 5.0.1 on 2024-02-24 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoclub', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dependiente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=32, unique=True)),
                ('password', models.CharField(max_length=64)),
                ('is_staff', models.BooleanField(blank=True, default=False, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
            options={
                'db_table': 'usuario',
            },
        ),
    ]
