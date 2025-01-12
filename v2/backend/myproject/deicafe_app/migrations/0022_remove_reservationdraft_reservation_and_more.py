# Generated by Django 4.2.17 on 2024-12-22 16:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('deicafe_app', '0021_reservationdraft_remove_cartitem_temp_order_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservationdraft',
            name='reservation',
        ),
        migrations.AddField(
            model_name='reservationdraft',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
