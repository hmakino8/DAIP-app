# Generated by Django 4.2.17 on 2024-12-22 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delicafe_app', '0014_rename_end_time_reservation_time_end_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='total_price',
            field=models.IntegerField(default=0),
        ),
    ]
