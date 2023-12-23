from rest_framework import serializers
from budget.models import Transaction, Account, Budget, SubAccountType, MonthData
from budget.serializers import AccountSerializer
##DASHBOARD

class DashboardSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    category = AccountSerializer()
    

    class Meta:
        model = Budget
        # fields = '__all__'
        fields = ['id', 'month', 'category','budget','actual','available']

##MonthData

class MonthDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MonthData
        fields = '__all__'
        # fields = ['id', 'month', 'category','budget','actual','available']