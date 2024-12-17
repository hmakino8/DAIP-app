# Generated by Django 4.2.17 on 2024-12-16 19:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('delicafe_app', '0007_alter_temporder_date_alter_temporder_seat_number_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='temporder',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='temporder',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
