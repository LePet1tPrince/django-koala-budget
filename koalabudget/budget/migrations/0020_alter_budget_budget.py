# Generated by Django 4.1 on 2023-10-11 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0019_alter_reconcilliation_reconcilliation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='budget',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
