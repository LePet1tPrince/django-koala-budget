# Generated by Django 4.1 on 2023-10-02 18:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0017_reconcilliation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reconcilliation',
            old_name='account_balance',
            new_name='balance',
        ),
        migrations.RenameField(
            model_name='reconcilliation',
            old_name='account_date',
            new_name='balance_date',
        ),
        migrations.RemoveField(
            model_name='reconcilliation',
            name='transactions',
        ),
        migrations.AddField(
            model_name='transaction',
            name='reconcilliation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reconcilliation', to='budget.reconcilliation'),
        ),
    ]
