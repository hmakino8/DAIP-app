# Generated by Django 4.2.17 on 2024-12-16 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deicafe_app', '0002_alter_reservation_status_temporderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='temporderitem',
            name='pre_order_discount',
            field=models.FloatField(default=0.1),
        ),
    ]