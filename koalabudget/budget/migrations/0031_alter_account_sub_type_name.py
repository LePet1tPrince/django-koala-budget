# Generated by Django 4.1 on 2023-10-28 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0030_account_sub_type_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='sub_type_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
