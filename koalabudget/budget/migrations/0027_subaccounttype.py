# Generated by Django 4.1 on 2023-10-27 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0026_account_reconciled_balance'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubAccountType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('account_type', models.CharField(choices=[('Asset', 'Asset'), ('Liability', 'Liability'), ('Income', 'Income'), ('Expense', 'Expense'), ('Equity', 'Equity')], max_length=10)),
            ],
        ),
    ]
