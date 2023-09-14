from rest_framework import serializers
from .models import Transaction, Account, Budget

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    debit = AccountSerializer()
    credit = AccountSerializer()
        
    class Meta:
        model = Transaction
        fields = ['id', 'date', 'amount', 'notes', 'debit', 'credit']
    
    def update(self, instance, validated_data):
        debitName = validated_data.pop('debit').get('name')
        creditName = validated_data.pop('credit').get('name')
        debit_account = Account.objects.get(name=debitName)
        credit_account = Account.objects.get(name=creditName)
        instance.debitAccount = debit_account
        instance.creditAccount = credit_account
        instance.amount = validated_data.get('amount', instance.amount)
        instance.date = validated_data.get('date', instance.date)
        instance.notes = validated_data.get('instance',instance.notes)
        instance.save()
        return instance


class BudgetSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    category = AccountSerializer()

    class Meta:
        model = Budget
        fields = ('id','month','category','budget','actual','available')