# Generated by Django 4.2.17 on 2024-12-22 17:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('delicafe_app', '0025_reservationdraft_cart_items'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservationdraft',
            name='cart_items',
        ),
    ]