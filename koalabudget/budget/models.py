from django.db import models

# Create your models here.

#account model
class Account(models.Model):
    class AccountTypes(models.TextChoices):
        asset = 'Asset'
        liability = 'Liability'
        income = 'Income'
        expense = 'Expense'
        goal = 'Goal'

    name = models.CharField(max_length=50)
    num = models.IntegerField()
    type = models.CharField(max_length=10, choices=AccountTypes.choices)

    def __str__(self):
        return str(self.num) + " - " + self.name + " - " + self.type


#Transaction model
class Transaction(models.Model):
    date = models.DateField(auto_now_add=False)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    debit = models.ForeignKey(Account,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name="debit",)
    credit = models.ForeignKey(Account,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name="credit",)

    notes = models.CharField(max_length=240, null=True)
    
    def __str__(self):
         return self.date.strftime("%d %b, %Y") + " - " + str(self.amount) + " - " + str(self.credit) + " -> " + str(self.debit) + " - " + self.notes
    

#Budget
class Budget(models.Model):
    month = models.DateField(auto_now_add=False)
    category = models.ForeignKey(Account,
        blank= False,
        null = False,
        on_delete=models.CASCADE)
    budget = models.DecimalField(max_digits=10,decimal_places=2)
    actual = models.DecimalField(max_digits=10,decimal_places=2, null=False, default=0)

    def __str__(self):
        return self.month.strftime("%b %Y") + " - " + str(self.category.name) + " - budget: " + str(self.budget) + " - actual: " + str(self.actual)