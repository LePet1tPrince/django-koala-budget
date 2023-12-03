from dateutil import parser as date_parser
from django.db import transaction
from django.db.models import Sum, F, Exists, Q
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
# from .calculations import generate_date_range
from budget.models import Transaction, Account, SubAccountType, Budget, Reconcilliation, MonthData
from .serializers import TransactionSerializer, AccountSerializer, AccountPostSerializer, SubAccountTypeSerializer, BatchTransactionSerializer, TransactionPostSerializer
from budget.signals import set_budget_actual, update_budget_actual, update_transaction_save, update_budget_save

# Create your views here.

@api_view(['GET', 'POST', 'PUT'])
def getTransactions(request):
    if request.method == "GET":
        trxns = Transaction.objects.all() 
        serializer = TransactionSerializer(trxns, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        # print("request:", request)
        data = request.data#['0']
        # print("request.data: ",data)
        # print("request.data.debit: ",data['debit'])

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
        serializer = TransactionPostSerializer(trxn, data=data)
        if serializer.is_valid():
            serializer.save()
            #on save, update the 'actual' field in 'budget' model
            print("Is this running?")
            update_budget_actual(sender=Transaction, instance=serializer.instance)
            # update_transaction_save(sender=Transaction, instance=serializer.instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # elif serializer.errors == non_field_errors:
        # serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("serializer data is: ", serializer.data)
        print("serialzer error is: ", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        transaction_ids = []
        
        transaction_data = request.data
        # print(transaction_data)
        # print([transaction_data[data]['id'] for data in transaction_data])

        transaction_id_list = [transaction_data[data]['id'] for data in transaction_data]
        transactions = Transaction.objects.filter(id__in=transaction_id_list)

        with transaction.atomic():
            for line in transaction_data:
                data = transaction_data[line]
                trxn = next((t for t in transactions if t.id == data['id']), None)
                if trxn is not None:
                    trxn.is_reconciled = data['is_reconciled']
                    trxn.credit = Account.objects.get(pk=int(data['credit']))
                    trxn.debit = Account.objects.get(pk=int(data['debit']))
                    trxn.notes = data['notes']
                    trxn.save()
                    transaction_ids.append(trxn.id)

            # Assuming you have a serializer for the Transaction model
            serializer = TransactionPostSerializer(instance=transactions, data=transaction_data, many=True)
            if serializer.is_valid():
                serializer.save()

        return Response("Transactions updated successfully", status=status.HTTP_200_OK)
    return Response("Invalid request", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getTransactionsByMonth(request, mnth, yr):
    if request.method == "GET":
        trxns = Transaction.objects.filter(Q(date__year__lt=yr) | (Q(date__year=yr) & Q(date__month__lte=mnth))) ## filter all transactions to the month
        bs_accounts = Account.objects.filter(type__in = ["Asset","Liability"]) ## get the list of assets and liabilities

        debit = trxns.filter(debit__in=bs_accounts).aggregate(Sum('amount'))['amount__sum'] or 0 ## find total of transactions that debit these accounts
        credit = trxns.filter(credit__in=bs_accounts).aggregate(Sum('amount'))['amount__sum'] or 0 ## find total of transactions that credit balance sheet accounts

        # credit = transactions.filter(credit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
        serializer = TransactionSerializer(trxns, many=True)
        # accountSerializer = AccountSerializer(listofassets, many=True)
        # return Response(accountSerializer.data)
        return Response({"NetWorth": debit - credit})
        return Response(serializer.data)
    

@api_view(['POST'])
def BatchCreateTransactionView(request):
    if request.method == "POST":
        data = request.data  # Assuming you receive a list of transactions
        print(data)
        serializer = TransactionPostSerializer(data=data, many=True)
        print(serializer)
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
def updateTransaction(request, pk):
    if request.method == "PUT":
        trxn = get_object_or_404(Transaction, pk=pk)
        data = request.data
        trxn.date = date_parser.parse(data['date']).date()
        # trxn.date = datetime.strptime(data['date'], "%Y-%m-%d").date(),
        # trxn.toAccount = Account.objects.get(pk=int(data['toAccount']))
        trxn.debit = Account.objects.get(pk=int(data['debit']))
        trxn.amount = data['amount']
        # trxn.fromAccount = Account.objects.get(pk=int(data['fromAccount']))
        trxn.credit = Account.objects.get(pk=int(data['credit']))
        trxn.notes = data['notes']
        trxn.save()
        serializer = TransactionPostSerializer(instance=trxn, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response()




@api_view(['DELETE'])
def deleteTransaction(request, id):
    trxn = get_object_or_404(Transaction, pk=id)
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
        print("post received")
        print("data", request.data)
        serializer = AccountPostSerializer(data=request.data)
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
def updateAccount(request, pk):
    data = request.data
    account = Account.objects.get(id=pk)
    serializer = AccountPostSerializer(instance=account, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#delete account
@api_view(['DELETE'])
def deleteAccount(request, pk):
    account = get_object_or_404(Account, pk=pk)
    account.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)