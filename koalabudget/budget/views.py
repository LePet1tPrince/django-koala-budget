from django.db.models import Sum, F, Exists
from django.db.models.functions import Coalesce
from django.db.models import IntegerField
import decimal
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from datetime import datetime
from rest_framework import status, serializers, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
# from .calculations import getActuals
from .models import Transaction, Account, Budget
from .serializers import TransactionSerializer, AccountSerializer, BudgetSerializer, BatchTransactionSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Model': 'Transactions',
            'methods' : {
                'GET': {
                    '/transactions': 'Get all transactions',
                    '/transactions/{trxn_id}': 'get a single transaction',
                    '/transactions/accounts/{account_id}':'Get all transactions in one account'
                    },
                'POST': {'/transactions':'New Transaction'},
                'PUT' : {'/transactions/{trxn_id}/update':'Update Existing Transaction'},
                'DELETE' : {'/transactions/{trxn_id}/delete':'Delete Transaction' }
            }

        },
         {
            'Model': 'Accounts',
            'methods' : {
                'GET': {
                    '/accounts':'Get all Accounts' ,
                    '/accounts/{account_id}':'Get one Account' ,
                    },
                'POST': {'/accounts':'New Account' },
                'PUT' : {'/accounts/{account_id}/update':'Update Existing Account' },
                'DELETE' : { '/accounts/{account_id}/delete':'Delete Transaction' }
            }

        },
        {
            'Model': 'Budget',
            'methods' : {
                'GET': {
                    '/budget':'Get all budgets' ,
                    '/budget/{year}/{month}':'Get the budget for the specified month ',
                    '/budget/{budget_id}':'Get a specific budget for a single month and single account',
                    '/budget/{account_id}':'Get the budget for all months for a specific category',
                    '/dashboard/{income_or_expense}/{year}/{month}':'Get all income/expense budget categories for a specific month'
                    },
                'POST': {'/budget':'Mew Budget' },
                'PUT' : {'/budget/{budget_id}/update':'Update Existing Account' },
                'DELETE' : { '/budget/{budget_id}/delete':'Delete Transaction' }
            }

        },
        


    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def getTransactions(request):
    if request.method == "GET":
        trxns = Transaction.objects.all() 
        serializer = TransactionSerializer(trxns, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data
        print("my single data is: ", data)
        trxn = Transaction.objects.create(
            # id=data['id'],
            date=datetime.strptime(data['date'], "%Y-%m-%d").date(),
            debit=Account.objects.get(pk=int(data['debit'])),
            # debit=data['debit'],
            amount=data['amount'],
            # credit=data['credit'],
            credit=Account.objects.get(pk=int(data['credit'])),

            notes=data['notes'],
        )
        serializer = TransactionSerializer(trxn, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # elif serializer.errors == non_field_errors:
        # serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def BatchCreateTransactionView(request):
    data = request.data  # Assuming you receive a list of transactions
    transactions_created = []
    for transaction_data in data:
        print("transaction data: ", transaction_data)
        # Create a Transaction object for each item in the list
        trxn = Transaction.objects.create(
            date=datetime.strptime(transaction_data['date'], "%Y-%m-%d").date(),
            # date=datetime.strptime(transaction_data.get('date'),'%Y-%m-%d'),
            debit=Account.objects.get(id=int(transaction_data['debit'])),
            amount=transaction_data['amount'],
            credit=Account.objects.get(id=int(transaction_data['credit'])),
            notes=transaction_data['notes'],
        )
        transactions_created.append(trxn)

    serializer = BatchTransactionSerializer(data=transactions_created, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#single transaction
@api_view(['GET'])
def getTransaction(request, pk):
    trxn = Transaction.objects.get(id=pk) 
    serializer = TransactionSerializer(trxn, many=False)
    return Response(serializer.data)


#transactions filtered by account
@api_view(['GET'])
def getFilteredTransactions(request, id):
    if request.method == "GET":
        trxns = Transaction.objects.filter(debit=id) | Transaction.objects.filter(credit=id)
        serializer = TransactionSerializer(trxns, many=True)
        return Response(serializer.data)

#update transaction
@api_view(['PUT'])
# @csrf_protect
def updateTransaction(request, pk):
    trxn = get_object_or_404(Transaction, pk=pk)
    data = request.data
    trxn.date = data['date']
    # trxn.toAccount = Account.objects.get(pk=int(data['toAccount']))
    trxn.debit = Account.objects.get(pk=int(data['debit']))
    trxn.amount = data['amount']
    # trxn.fromAccount = Account.objects.get(pk=int(data['fromAccount']))
    trxn.credit = Account.objects.get(pk=int(data['credit']))
    trxn.notes = data['notes']
    trxn.save()
    serializer = TransactionSerializer(instance=trxn, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteTransaction(request, pk):
    trxn = get_object_or_404(Transaction, pk=pk)
    trxn.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


##ACCOUNTS

#Accounts feed
@api_view(['GET', 'POST'])
def getAccounts(request):
    if request.method == "GET":
        feed = Account.objects.all() 
        serializer = AccountSerializer(feed, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#get single account
@api_view(['GET'])
def getAccount(request, pk):
    account = Account.objects.get(id=pk) 
    serializer = AccountSerializer(account, many=False)
    return Response(serializer.data)

#update account
@api_view(['PUT'])
# @csrf_protect
def updateAccount(request, pk):
    data = request.data
    account = Account.objects.get(id=pk)
    serliazer = AccountSerializer(instance=account, data=data)
    if serliazer.is_valid():
        serliazer.save()
    return Response(serliazer.data)


#delete account
@api_view(['DELETE'])
def deleteAccount(request, pk):
    account = get_object_or_404(Account, pk=pk)
    account.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

    ## BUDGET##
#get bugdget and new budget
@api_view(['GET', 'POST'])
def getBudgets(request):
    if request.method == "GET":
        budgets = Budget.objects.all()
        # budgets = getActuals(Budget,Transaction,Account)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data
        budget = Budget.objects.create(
            id=data['id'],
            month=data['month'],
            budget=data['budget'],
            category=Account.objects.get(pk=int(data['category']))
        )
        serializer = BudgetSerializer(budget, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#get single budget
@api_view(['GET'])
def getBudget(request,pk):
    budget = Budget.objects.get(pk=pk)
    serializer = BudgetSerializer(budget, many=False)
    return Response(serializer.data)

#get budget by month
@api_view(['GET'])
def getBudgetByMonth(request,mnth,yr):
    budget = Budget.objects.filter(
        month__year=yr,
        month__month=mnth
    )
#     

    serializer = BudgetSerializer(budget, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def updateBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    data = request.data
    budget.budget=float(data['budget'])
    budget.save()
    serializer = BudgetSerializer(budget, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    budget.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



#dashboard

@api_view(['GET'])
def getIncomeChartByMonth(request,mnth,yr):
    budget = Budget.objects.filter(
        category__type="Income",
        month__year=yr,
        month__month=mnth)

    serializer = BudgetSerializer(budget, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getExpenseChartByMonth(request, mnth, yr):
    budget = Budget.objects.filter(
        category__type="Expense",
        month__year=yr,
        month__month=mnth)
    
    

    serializer = BudgetSerializer(budget, many=True)
    return Response(serializer.data)
