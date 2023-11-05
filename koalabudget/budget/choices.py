from django.db import models

class AccountTypes(models.TextChoices):
    asset = 'Asset'
    liability = 'Liability'
    income = 'Income'
    expense = 'Expense'
    equity = 'Equity'
    goal = 'Goal'