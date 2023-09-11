from django.test import TestCase
from budget.models import Account, Transaction, Budget
import datetime

class AccountTestCase(TestCase):
    def setUp(self):
        Account.objects.create(num="1010",name="Tangerine Bank",type="Asset")
        Account.objects.create(num="2020",name="Credit Card ",type="Liability")
        Account.objects.create(num="3030",name="Van Fund ",type="Goal")
        Account.objects.create(num="4040",name="World Vision Income",type="Income")
        Account.objects.create(num="5050",name="Groceries",type="Expense")
    
    def testAccountTypes(self):
        asset = Account.objects.get(num="1010")
        self.assertEqual(asset.type,"Asset")

        liability = Account.objects.get(num="2020")
        self.assertEqual(liability.type,"Liability")

        goal = Account.objects.get(num="3030")
        self.assertEqual(goal.type,"Goal")

        income = Account.objects.get(num="4040")
        self.assertEqual(income.type,"Income")

        expense = Account.objects.get(num="5050")
        self.assertEqual(expense.type,"Expense")
    


class TransactionTestCase(TestCase):
    def setUp(self):
        Transaction.objects.create(date="2023-09-10",amount=50,debit=asset, credit=income)
    
    # def testTransaction(self):

