# Generated by Django 4.1 on 2023-11-11 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0035_alter_subaccounttype_account_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='MonthData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.DateField()),
                ('netWorth', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
    ]