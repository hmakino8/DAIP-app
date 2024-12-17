# Generated by Django 4.2.17 on 2024-12-16 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delicafe_app', '0004_temporderitem_date_temporderitem_seat_number_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='temporderitem',
            name='date',
        ),
        migrations.RemoveField(
            model_name='temporderitem',
            name='seat_number',
        ),
        migrations.RemoveField(
            model_name='temporderitem',
            name='time',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='seat_number',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='time',
            field=models.TimeField(null=True),
        ),
    ]
