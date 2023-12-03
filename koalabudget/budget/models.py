from django.db import models
from django.db.models import Sum, F, Exists, Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from dateutil.relativedelta import relativedelta 
from .choices import AccountTypes


# Create your models here.
#subaccount
class SubAccountType(models.Model):

    sub_type = models.CharField(max_length=50)
    account_type = models.CharField(max_length=10, choices=AccountTypes.choices)


    def __str__(self):
        return self.account_type + " - " + self.sub_type


#account model
class Account(models.Model):



    name = models.CharField(max_length=50)
    num = models.IntegerField(unique=True)
    type = models.CharField(max_length=10, choices=AccountTypes.choices)
    sub_type = models.ForeignKey(SubAccountType, on_delete=models.CASCADE, null=True, blank=True)
    # sub_type_name = models.CharField(max_length=50, blank=True, null=True)
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

    def get_sub_type_name(self):
        if self.sub_type != None:
                return self.sub_type.sub_type
        return ''



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
        on_delete=models.RESTRICT,
        related_name="debit",)
    credit = models.ForeignKey(Account,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
        related_name="credit",)

    notes = models.CharField(max_length=240, null=True, blank=True)
    is_reconciled = models.BooleanField(default=False)

    
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
    
    
    def get_available(self):
        last_month = self.month - relativedelta(months=1)
        last_month_objects = Budget.objects.filter(
            month__month=last_month.month,
            month__year=last_month.year,
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
    


## Net Worth
class MonthData(models.Model):
    month = models.DateField(auto_now_add=False)
    netWorth = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return '{} - {}'.format(self.month.strftime("%b %Y"),self.netWorth)

    def get_NetWorth(self):
        yr = self.month.year
        mnth = self.month.month
        trxns = Transaction.objects.filter(Q(date__year__lt=yr) | (Q(date__year=yr) & Q(date__month__lte=mnth))) ## filter all transactions to the month
        bs_accounts = Account.objects.filter(type__in = ["Asset","Liability"]) ## get the list of assets and liabilities

        debit = trxns.filter(debit__in=bs_accounts).aggregate(Sum('amount'))['amount__sum'] or 0 ## find total of transactions that debit these accounts
        credit = trxns.filter(credit__in=bs_accounts).aggregate(Sum('amount'))['amount__sum'] or 0 ## find total of transactions that credit balance sheet accounts

        return debit - credit


