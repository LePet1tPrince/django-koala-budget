from django.db import models
from django.db.models import Sum, F, Exists
from django.db.models.signals import post_save
from django.dispatch import receiver
F

# Create your models here.

#account model
class Account(models.Model):
    class AccountTypes(models.TextChoices):
        asset = 'Asset'
        liability = 'Liability'
        income = 'Income'
        expense = 'Expense'


    name = models.CharField(max_length=50)
    num = models.IntegerField()
    type = models.CharField(max_length=10, choices=AccountTypes.choices)
    inBankFeed = models.BooleanField(default=False)
    balance = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)

    def get_account_balance(self):
        debit_trxn = Transaction.objects.filter(debit__id=self.id)
        
        credit_trxn = Transaction.objects.filter(credit__id=self.id)

        debit_amount = debit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
        credit_amount = credit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0

        # return debit_amount - credit_amount
        self.actual = debit_amount - credit_amount
        self.save()



    def __str__(self):
        return str(self.num) + " - " + self.name + " - " + self.type


## Reconcilliation model
class Reconcilliation(models.Model):
    account = models.ForeignKey(Account,
        blank= False,
        null = False,
        on_delete=models.CASCADE)
    # transactions = models.ForeignKey(Transaction,
    #     blank=True,
    #     null=True,
    #     on_delete=models.RESTRICT)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    balance_date = models.DateField(auto_now_add=False)
    reconcilliation_date = models.DateField(auto_now=True)
    # transactions = models.ArrayField()

    def get_transaction_ids(self):
        transactions = Transaction.objects.filter(reconcilliation=self)
        return [transaction.id for transaction in transactions]
    
    def __str__(self):
        return str(self.account.name) + " - " + str(self.balance_date)



#Transaction model
class Transaction(models.Model):
    date = models.DateField(auto_now_add=False)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    debit = models.ForeignKey(Account,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
        related_name="debit",)
    credit = models.ForeignKey(Account,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
        related_name="credit",)

    notes = models.CharField(max_length=240, null=True, blank=True)

    reconcilliation = models.ForeignKey(Reconcilliation, 
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="reconcilliation")
    
    def __str__(self):
         return str(self.amount) + " - " + str(self.credit) + " -> " + str(self.debit) + " - " + self.notes
    

#Budget
class Budget(models.Model):
    month = models.DateField(auto_now_add=False)
    category = models.ForeignKey(Account,
        blank= False,
        null = False,
        on_delete=models.RESTRICT)
    budget = models.DecimalField(max_digits=10,decimal_places=2)
    actual = models.DecimalField(max_digits=10,decimal_places=2, null=False, default=0)
    available = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)
    category_name = models.CharField(max_length=50, null=True, blank=True)


    def get_actual(self):

        debit_trxn = Transaction.objects.filter(date__year=self.month.year,date__month=self.month.month, debit=self.category)
        
        credit_trxn = Transaction.objects.filter(
            date__year=self.month.year,
            date__month=self.month.month,
            credit=self.category
        )

        debit_amount = debit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
        credit_amount = credit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0

        # return debit_amount - credit_amount
        self.actual = debit_amount - credit_amount
        self.save()
    
    def get_available(self):
        return self.budget - self.actual
    
    def get_category_name(self):
        return self.category.name

    def __str__(self):
        return self.month.strftime("%b %Y") + " - " + str(self.category.name) + " - budget: " + str(self.budget) + " - actual: " + str(self.actual)
    

class Goal(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=240)
    target = models.DecimalField(max_digits=10, decimal_places=2)
    saved = models.DecimalField(max_digits=10, decimal_places=2)
    remainder = models.DecimalField(max_digits=10, decimal_places=2)

    
    def get_remainder(self):
        return self.target - self.saved


    def __str__(self):
        return '{} - ${} / ${}'.format(self.name,self.saved,self.target)





@receiver(post_save, sender=Goal)
def update_togo(sender,instance, **kwargs):
    instance.remainder = instance.get_remainder()
    Goal.objects.filter(pk=instance.pk).update(remainder=instance.remainder)

## Receiver functions to update values upon model changes

#Every time a transaction is updated, update the 'balance' field for accounts on those categories
@receiver(post_save, sender=Transaction)
def update_account_balance(sender, instance, **kwargs):
    # Update the balance for the debit account
    debit_account = instance.debit
    credit_debit_balance = Transaction.objects.filter(credit=debit_account).aggregate(Sum('amount'))['amount__sum'] or 0
    debit_debit_balance = Transaction.objects.filter(debit=debit_account).aggregate(Sum('amount'))['amount__sum']or 0
    Account.objects.filter(id=debit_account.id).update(balance=debit_debit_balance - credit_debit_balance)

    # Update the balance for the credit account
    credit_account = instance.credit
    debit_credit_balance = Transaction.objects.filter(debit=credit_account).aggregate(Sum('amount'))['amount__sum'] or 0
    credit_credit_balance = Transaction.objects.filter(credit=credit_account).aggregate(Sum('amount'))['amount__sum'] or 0
    Account.objects.filter(id=credit_account.id).update(balance=debit_credit_balance - credit_credit_balance)




#Every time a transaction is updated, update the 'actual' field for budgets on those categories
@receiver(post_save, sender=Transaction)
def update_budget_actual(sender, instance, **kwargs):
    """
    Signal receiver to update the Budget actual field after a Transaction is saved.
    """
    debit_category = instance.debit  # Assuming the debit account determines the category
    credit_category = instance.credit
    print("instance", instance.date)
    if instance.date:
        print("Transaction date:", instance.date)
        print("Year:", instance.date.year)
        print("Month:", instance.date.month)
    if debit_category:
        budgets = Budget.objects.filter(
            month__year=instance.date.year,
            month__month=instance.date.month,
            category=debit_category,
        )
        for budget in budgets:
            budget.get_actual()
    elif credit_category:
        budgets = Budget.objects.filter(
            month__year=instance.date.year,
            month__month=instance.date.month,
            category=credit_category,
        )
        for budget in budgets:
            budget.get_actual()


#Every time a budget is updated, recalculate the 'available' field
@receiver(post_save, sender=Budget)
def update_available(sender, instance, **kwargs):
    instance.available = instance.get_available()
    Budget.objects.filter(pk=instance.pk).update(available=instance.available)

#Update budget.Category_name everytime budget is updated
@receiver(post_save, sender=Budget)
def update_available(sender, instance, **kwargs):
    instance.category_name = instance.get_category_name()
    Budget.objects.filter(pk=instance.pk).update(category_name=instance.category_name)

# #Update budget.Category_name everytime budget is updated
# @receiver(post_save, sender=Transaction)
# def update_Reconcilliation(sender, instance, **kwargs):
#     # instance.category_name = instance.get_category_name()
#     Reconcilliation.objects.filter(pk=instance.reconcilliation.id).update(category_name=instance.category_name)