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
from .functions import generate_date_range
from budget.models import Transaction, Account, SubAccountType, Budget, MonthData
from .serializers import  MonthDataSerializer
from budget.serializers import BudgetSerializer, AccountSerializer
# from .signals import set_budget_actual, update_budget_actual, update_transaction_save, update_budget_save

# Create your views here.

#dashboard

@api_view(['GET'])
def getIncomeChartByMonth(request,mnth,yr):
    budgets = Budget.objects.filter(
        category__type="Income",
        month__year=yr,
        month__month=mnth)
    
    for budget in budgets:
        if budget.available > 0:
            budget.actual = 0
        elif budget.available < 0:
            budget.budget = 0
       


    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getExpenseChartByMonth(request, mnth, yr):
    budgets = Budget.objects.filter(
        category__type="Expense",
        month__year=yr,
        month__month=mnth)
    
    for budget in budgets:
        if budget.available < 0:
            budget.actual = 0
        elif budget.available > 0:
            budget.budget = 0
    
    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getActiveityByDay(request, start, end):
    if request.method == "GET":
        ## create a list of all days in between start and end date
        date_list = generate_date_range(start, end)

        ## get all accounts relevant for activity
        accounts = Account.objects.filter(type = "Income")

        ## for each date in list
        result = []
        for day in date_list:
            ## get all transactions that debit or credit an income account
            activity_sum = Transaction.objects.filter(
                date = day
                ).aggregate(Sum('amount'))['amount__sum'] or 0
            result.append({"value": activity_sum, "day": day, })
       
        return Response(result)


## REPORTS

@api_view(['GET'])
def getRangeReport(request, start, end):
    if request.method == "GET":
        transactions = Transaction.objects.filter(
            date__gte = start,
            date__lte = end
        )
        # print(transactions)
        accounts = Account.objects.all()
        for acc in accounts:
            debit = transactions.filter(debit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            credit = transactions.filter(credit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            # debit - credit
            acc.balance = debit - credit
            acc.save()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getCumulativeReport(request, end):
      if request.method == "GET":
        transactions = Transaction.objects.filter(
            # date__gte = start,
            date__lte = end
        )
        # print(transactions)
        accounts = Account.objects.all()
        for acc in accounts:
            debit = transactions.filter(debit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            credit = transactions.filter(credit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            # debit - credit
            acc.balance = debit - credit
            acc.save()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)


## Month data

@api_view(['GET'])
def getSingleMonthData(request, mnth, yr):
    if request.method == "GET":
        data = MonthData.objects.filter(Q(month__year__lt=yr) | (Q(month__year=yr) & Q(month__month__lte=mnth)))
        serializer = MonthDataSerializer(data, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def getMonthData(request):
    if request.method == "GET":
        data = MonthData.objects.all()
        serializer = MonthDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data  # Assuming you receive a list of transactions
        print(data)
        serializer = MonthDataSerializer(data=data, many=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            #for each item being posted, run the receiver function to calculate actual.
            # for i in serializer.instance:
            #     set_budget_actual(sender=Budget, instance=i)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


## Month data

@api_view(['GET'])
def getSingleMonthData(request, mnth, yr):
    if request.method == "GET":
        data = MonthData.objects.filter(Q(month__year__lt=yr) | (Q(month__year=yr) & Q(month__month__lte=mnth)))
        serializer = MonthDataSerializer(data, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def getMonthData(request):
    if request.method == "GET":
        data = MonthData.objects.all()
        serializer = MonthDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data  # Assuming you receive a list of transactions
        print(data)
        serializer = MonthDataSerializer(data=data, many=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            #for each item being posted, run the receiver function to calculate actual.
            # for i in serializer.instance:
            #     set_budget_actual(sender=Budget, instance=i)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
