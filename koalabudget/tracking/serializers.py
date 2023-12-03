from rest_framework import serializers
from budget.models import Transaction, Account, Budget, SubAccountType, MonthData

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

