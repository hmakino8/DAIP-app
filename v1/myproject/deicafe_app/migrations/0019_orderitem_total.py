# Generated by Django 4.2.17 on 2024-12-22 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deicafe_app', '0018_rename_total_price_reservation_total_with_tax_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='total',
            field=models.IntegerField(default=0),
        ),
    ]