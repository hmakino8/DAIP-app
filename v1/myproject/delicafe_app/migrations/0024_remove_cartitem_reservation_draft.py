# Generated by Django 4.2.17 on 2024-12-22 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('delicafe_app', '0023_cartitem_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='reservation_draft',
        ),
    ]
