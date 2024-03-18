# Generated by Django 5.0.3 on 2024-03-18 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('authentication', '0009_alter_user_id'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['username', 'email'], name='user_idx'),
        ),
    ]
