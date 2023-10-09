from rest_framework import serializers
from .models import Transaction, Account, Budget, Goal, Reconcilliation

class AccountSerializer(serializers.ModelSerializer):
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
    
    #what does this do?
    # def update(self, instance, validated_data):
    #     debitName = validated_data.pop('debit').get('name')
    #     creditName = validated_data.pop('credit').get('name')
    #     debit_account = Account.objects.get(name=debitName)
    #     credit_account = Account.objects.get(name=creditName)
    #     instance.debitAccount = debit_account
    #     instance.creditAccount = credit_account
    #     instance.amount = validated_data.get('amount', instance.amount)
    #     instance.date = validated_data.get('date', instance.date)
    #     instance.notes = validated_data.get('instance',instance.notes)
    #     instance.save()
    #     return instance
class TransactionListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        transactions = [Transaction(**item) for item in validated_data]
        return Transaction.objects.bulk_create(transactions)
    

class TransactionPostSerializer(serializers.ModelSerializer):
    # debit = AccountSerializer()
    # credit = AccountSerializer()
    date = serializers.DateField(format="%Y-%m-%d")
        
    class Meta:
        list_serializer_class = TransactionListSerializer
        model = Transaction
        fields = '__all__'


    


#serializer for multiple transactions at once.
class BatchTransactionSerializer(serializers.ModelSerializer):
    # debit = AccountSerializer()
    # credit = AccountSerializer()
    # debit_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Account.objects.all(),
    #     source='debit',
    #     write_only=True
    # )

    # credit_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Account.objects.all(),
    #     source='credit',
    #     write_only=True
    # )
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
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class ReconcilliationSerializer(serializers.ModelSerializer):
    transaction_ids = serializers.SerializerMethodField()

    class Meta:
        model = Reconcilliation
        fields = ['id', 'account', 'balance', 'balance_date', 'reconcilliation_date', 'transaction_ids']

        # fields = '__all__'

    def get_transaction_ids(self, obj):
        # This method will be called to get the transaction IDs for the current Reconcilliation instance (obj)
        return obj.get_transaction_ids()