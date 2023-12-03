from rest_framework import serializers
from .models import Transaction, Account, Budget, SubAccountType, MonthData

class SubAccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubAccountType
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    sub_type = SubAccountTypeSerializer()
    # sub_type_name = get_sub_type_name()

    class Meta:
        model = Account
        fields = '__all__'

class AccountPostSerializer(serializers.ModelSerializer):
    # sub_type = serializers.StringRelatedField(read_only=True)
    # sub_type_name = get_sub_type_name()

    class Meta:
        model = Account
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    debit = AccountSerializer()
    credit = AccountSerializer()
    date = serializers.DateField(format="%Y-%m-%d")
        
    class Meta:
        model = Transaction
        fields = '__all__'
    
    
class TransactionListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        transactions = [Transaction(**item) for item in validated_data]
        return Transaction.objects.bulk_create(transactions)
    

class TransactionPostSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%Y-%m-%d")
        
    class Meta:
        list_serializer_class = TransactionListSerializer
        model = Transaction
        fields = '__all__'


    


#serializer for multiple transactions at once.
class BatchTransactionSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%Y-%m-%d")
    class Meta:
        list_serializer_class = TransactionListSerializer
        model = Transaction
        fields = '__all__'



class BudgetSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    category = AccountSerializer()
    

    class Meta:
        model = Budget
        # fields = '__all__'
        fields = ['id', 'month', 'category','budget','actual','available']

    def to_representation(self, instance):
        data = super(BudgetSerializer, self).to_representation(instance)
        
        # Check if the category is "Income" and multiply the fields by -1
        if instance.category.type == "Income":
            if float(data['budget']) != 0:
                data['budget'] = "{:.2f}".format(-float(data['budget']))
            if float(data['actual']) != 0:
                data['actual'] = "{:.2f}".format(-float(data['actual']))

            # data['available'] = "{:.2f}".format(-1*float(data['available']))

        return data

    
#list serializer for the batch budget new month posts
class BudgetListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        budgets = [Budget(**item) for item in validated_data]
        return Budget.objects.bulk_create(budgets)

#batch budget post serliaizer for new month posts
class BatchBudgetPostSerializer(serializers.ModelSerializer):
    month = serializers.DateField(format="%Y-%m-%d")
    class Meta:
        list_serializer_class = BudgetListSerializer
        model = Budget
        fields = '__all__'
    



## GOALS

# class GoalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Goal
#         fields = '__all__'


##RECONCILIATION

# class ReconcilliationSerializer(serializers.ModelSerializer):
#     transaction_ids = serializers.SerializerMethodField()

#     class Meta:
#         model = Reconcilliation
#         fields = ['id', 'account', 'balance', 'balance_date', 'reconcilliation_date', 'transaction_ids']

#         # fields = '__all__'

    # def get_transaction_ids(self, obj):
    #     # This method will be called to get the transaction IDs for the current Reconcilliation instance (obj)
    #     return obj.get_transaction_ids()
    

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