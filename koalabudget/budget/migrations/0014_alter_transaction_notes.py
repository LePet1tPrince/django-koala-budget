# Generated by Django 4.1 on 2023-09-26 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0013_goal_remainder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='notes',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
    ]
