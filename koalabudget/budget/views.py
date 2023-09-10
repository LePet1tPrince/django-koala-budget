from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from .models import Transaction, Account, Budget
from .serializers import TransactionSerializer, AccountSerializer, BudgetSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/feed/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        },
        {
            'Endpoint': '/feed/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single transaction object'
        },
        {
            'Endpoint': '/feed/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new transaction with data sent in post request'
        },
        {
            'Endpoint': '/feed/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing transaction with data sent in post request'
        },
        {
            'Endpoint': '/feed/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and existing transaction'
        },
        {
            'Endpoint': '/accounts/',
            'method': 'GET',
            'body': None,
            'description': 'Retrieve list of accounts'
        },
        {
            'Endpoint': '/accounts/id',
            'method': 'accounts',
            'body': None,
            'description': 'Retreives single account for viewing'
        },
        {
            'Endpoint': '/accounts/id/update',
            'method': 'PUT',
            'body': None,
            'description': 'Update Account'
        },
        {
            'Endpoint': '/accounts/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and existing transaction'
        },
        {
            'Endpoint': '/goals/',
            'method': 'GET',
            'body': None,
            'description': 'Fetch list of goal transactions'
        },
        {
            'Endpoint': '/dashboard/startdate_enddate',
            'method': 'GET',
            'body': None,
            'description': 'Returns data to populate chart data based on start date and end date'
        },
        {
            'Endpoint': '/budget/',
            'method': 'GET',
            'body': None,
            'description': 'Return budget data'
        },
        {
            'Endpoint': '/budget/year',
            'method': 'GET',
            'body': None,
            'description': 'Return budget data for a specific year'
        },
        {
            'Endpoint': '/budget/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'Delete a budget (I dont think this is still active, it will just update to 0)'
        },
        {
            'Endpoint': '/budget/id/update',
            'method': 'PUT',
            'body': None,
            'description': 'Update a budget'
        }


    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getTrxns(request):
    if request.method == "GET":
        trxns = Transaction.objects.all() 
        serializer = TransactionSerializer(trxns, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        data = request.data
        trxn = Transaction.objects.create(
            id=data['id'],
            date=data['date'],
            debit=Account.objects.get(pk=int(data['debit'])),
            # toAccount=data['toAccount'],
            amount=data['amount'],
            credit=Account.objects.get(pk=int(data['credit'])),
            # fromAccount=data['fromAccount'],

            notes=data['notes'],
        )
        serializer = TransactionSerializer(trxn, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
