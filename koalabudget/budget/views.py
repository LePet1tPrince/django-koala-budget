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
from .calculations import generate_date_range
from .models import Transaction, Account, SubAccountType, Budget, Reconcilliation, MonthData
from .serializers import TransactionSerializer, AccountSerializer, AccountPostSerializer, SubAccountTypeSerializer, BudgetSerializer, BatchTransactionSerializer, TransactionPostSerializer, ReconcilliationSerializer, BatchBudgetPostSerializer, MonthDataSerializer
from .signals import set_budget_actual, update_budget_actual, update_transaction_save, update_budget_save

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
                'POST': {
                    '/transactions':'New Transaction',
                    '/transactions/createmultiple': 'Bulk upload transactions'
                         },
                'PUT' : {
                    '/transactions/update/{trxn_id}':'Update Existing Transaction',
                    '/transactions/update':'Batch update Transactions'
                    },
                'DELETE' : {'/transactions/delete/{trxn_id}':'Delete Transaction' }
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
                'PUT' : {'/accounts/update/{account_id}':'Update Existing Account' },
                'DELETE' : { '/accounts/delete/{account_id}':'Delete Transaction' }
            }

        },
        {
            'Model': 'Budget',
            'methods' : {
                'GET': {
                    '/budget':'Get all budgets' ,
                    '/budget/month/{year}/{month}':'Get the budget for the specified month ',
                    # '/budget/{budget_id}':'Get a specific budget for a single month and single account',
                    # '/budget/{account_id}':'Get the budget for all months for a specific category',
                    },
                'POST': {'/budget':'Mew Budget' },
                'PUT' : {'/budget//update/{budget_id}':'Update Existing Account' },
                'DELETE' : { '/budget/delete/{budget_id}':'Delete Transaction' }
            }

        },

        # {
        #     'Model': 'Goal',
        #     'methods' : {
        #         'GET': {
        #             '/goals':'Get all Goals' ,

        #             },
        #         # 'POST': {'/budget':'Mew Budget' },
        #         'PUT' : {'/goals/update/{goal_id}':'Update Existing Account' },
        #         # 'DELETE' : { '/budget/{budget_id}/delete':'Delete Transaction' }
        #     }

        # },
        {
            'Model': 'Dashboard',
            'methods' : {
                'GET': {
                     '/dashboard/{income_or_expense}/{year}/{month}':'Get all income/expense budget categories for a specific month'


                    },
                # 'POST': {'/budget':'Mew Budget' },
                # 'PUT' : {'/goals/update/{goal_id}':'Update Existing Account' },
                # 'DELETE' : { '/budget/{budget_id}/delete':'Delete Transaction' }
            }

        },

         {
            'Model': 'Reports',
            'methods' : {
                'GET': {
                     '/reports/{start-date (YYYY-MM-DD)}/{end-date (YYYY-MM-DD)}':'return all acounts with the balance field containing the sum of all transaction activities in that date range',
                     '/cumulative-reports/end-date (YYYY-MM-DD)}':'return all acounts with the balance field containing the sum of all transaction activities before the end date',



                    },
                # 'POST': {'/budget':'Mew Budget' },
                # 'PUT' : {'/goals/update/{goal_id}':'Update Existing Account' },
                # 'DELETE' : { '/budget/{budget_id}/delete':'Delete Transaction' }
            }

        },
        


    ]
    return Response(routes)



## SUB ACCOUNTS ##

@api_view(['GET', 'POST'])
def getSubAccounts(request):
    if request.method == "GET":
        feed = SubAccountType.objects.all() 
        serializer = SubAccountTypeSerializer(feed, many=True)
        return Response(serializer.data)
    # elif request.method == "POST":
    #     serializer = AccountSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['POST'])
def postBatchBudget(request):
    if request.method == "POST":
        data = request.data  # Assuming you receive a list of transactions
        print(data)
        serializer = BatchBudgetPostSerializer(data=data, many=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            #for each item being posted, run the receiver function to calculate actual.
            for i in serializer.instance:
                set_budget_actual(sender=Budget, instance=i)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    data = request.data
    # print(data)
    acc_type = Account.objects.get(pk=data['category'])
    # print("Accounttype", acc_type.type)
    budget.budget=float(data['budget'])
    if acc_type.type == "Income":
        budget.budget=-float(data['budget'])
        budget.actual=-float(data['actual'])
        budget.available=-float(data['available'])
    budget.save()
    # serializer = BudgetSerializer(budget, data=data)
    serializer = BatchBudgetPostSerializer(budget, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteBudget(request, pk):
    budget = get_object_or_404(Budget, pk=pk)
    budget.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


#goals

# @api_view(['GET', 'POST'])
# def getGoals(request):
#     if request.method == "GET":
#         goals = Goal.objects.all() 
#         serializer = GoalSerializer(goals, many=True)
#         return Response(serializer.data)
#     elif request.method == "POST":
#         serializer = GoalSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# def updateGoals(request, pk):
#     goal = get_object_or_404(Goal, pk=pk)
#     data = request.data
#     # print(data)
#     # acc_type = Account.objects.get(pk=data['category'])
#     # print("Accounttype", acc_type.type)
#     goal.saved=float(data['saved'])
#     goal.save()
#     # serializer = BudgetSerializer(budget, data=data)
#     serializer = GoalSerializer(goal, data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            ## add up the amount of those transactions
            # accounts = Account.objects.all()
            # for acc in accounts:
            #     # if acc.type
            #     debit = transactions.filter(debit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            #     credit = transactions.filter(credit = acc.id).aggregate(Sum('amount'))['amount__sum'] or 0
            #     # debit - credit
            #     acc.balance = debit - credit
            #     acc.save()
            # serializer = AccountSerializer(accounts, many=True)
            # return Response(serializer.data)
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



##reconcilliation
@api_view(['GET'])
def getReconcilliations(request):
    if request.method == "GET":
        reconcilliations = Reconcilliation.objects.all()
        serializer = ReconcilliationSerializer(reconcilliations, many=True)
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
    


