# Generated by Django 4.1 on 2023-09-14 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0009_alter_budget_available'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='balance',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='budget',
            name='available',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
