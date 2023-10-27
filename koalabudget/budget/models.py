from django.db import models
from django.db.models import Sum, F, Exists
from django.db.models.signals import post_save
from django.dispatch import receiver
from dateutil.relativedelta import relativedelta 


# Create your models here.
#subaccount
class SubAccountType(models.Model):
    class AccountTypes(models.TextChoices):
        asset = 'Asset'
        liability = 'Liability'
        income = 'Income'
        expense = 'Expense'
        equity = 'Equity'

    name = models.CharField(max_length=50)
    account_type = models.CharField(max_length=10, choices=AccountTypes.choices)

    def __str__(self):
        return self.name


#account model
class Account(models.Model):
    class AccountTypes(models.TextChoices):
        asset = 'Asset'
        liability = 'Liability'
        income = 'Income'
        expense = 'Expense'
        equity = 'Equity'


    name = models.CharField(max_length=50)
    num = models.IntegerField()
    type = models.CharField(max_length=10, choices=AccountTypes.choices)
    sub_type = models.ForeignKey(SubAccountType, on_delete=models.CASCADE, null=True, blank=True)
    inBankFeed = models.BooleanField(default=False)
    balance = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)
    reconciled_balance = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True, default=0)


    def get_account_balance(self):
        debit_trxn = Transaction.objects.filter(debit__id=self.id)
        
        credit_trxn = Transaction.objects.filter(credit__id=self.id)

        debit_amount = debit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
        credit_amount = credit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
        # credit_balance = Transaction.objects.filter(credit=self).aggregate(Sum('amount'))['amount__sum'] or 0
        # debit_balance = Transaction.objects.filter(debit=self).aggregate(Sum('amount'))['amount__sum']or 0

        return debit_amount - credit_amount
        # self.actual = debit_amount - credit_amount
        # self.save()
    
    def get_reconcilliation_balance(self):
        debit_trxn = Transaction.objects.filter(debit__id=self.id, is_reconciled=True)
        
        credit_trxn = Transaction.objects.filter(credit__id=self.id, is_reconciled=True)

        debit_amount = debit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
        credit_amount = credit_trxn.aggregate(Sum('amount'))['amount__sum'] or 0
# 
        return debit_amount - credit_amount
    #     self.actual = debit_amount - credit_amount
    #     self.save()



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
    is_reconciled = models.BooleanField(default=False)

    reconcilliation = models.ForeignKey(Reconcilliation, 
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="reconcilliation")
    
    def __str__(self):
         return str(self.amount) + " - " + str(self.credit) + " -> " + str(self.debit) + " - " + str(self.notes)
    

#Budget
class Budget(models.Model):
    month = models.DateField(auto_now_add=False)
    category = models.ForeignKey(Account,
        blank= False,
        null = False,
        on_delete=models.CASCADE)
    budget = models.DecimalField(max_digits=10,decimal_places=2, null=False, default=0)
    actual = models.DecimalField(max_digits=10,decimal_places=2, null=False, default=0)
    available = models.DecimalField(max_digits=10,decimal_places=2, null=False, blank=True, default=0)
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

        return debit_amount - credit_amount
        # self.actual = debit_amount - credit_amount
        # self.save()
    
    def get_available(self):
        last_month = self.month - relativedelta(months=1)

        # print("last_month", last_month)
        last_month_objects = Budget.objects.filter(
            month=last_month,
            category=self.category
            )
        if last_month_objects.exists():
            last_month_available = last_month_objects[0].available
            # print("lastmonht_availan",last_month_available)
        else:
            last_month_available = 0
        
        return float(self.budget) - float(self.actual) + float(last_month_available)
    
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
        return float(self.target) - float(self.saved)


    def __str__(self):
        return '{} - ${} / ${}'.format(self.name,self.saved,self.target)




