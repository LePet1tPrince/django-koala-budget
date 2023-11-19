from django.db import models
from django.db.models import Sum, F, Exists
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, Account, Goal, Budget

@receiver(post_save, sender=Goal)
def update_togo(sender,instance, **kwargs):
    instance.remainder = instance.get_remainder()
    Goal.objects.filter(pk=instance.pk).update(remainder=instance.remainder)

## Receiver functions to update values upon model changes

#Every time a transaction is updated, update the 'balance' field for all accounts
@receiver(post_save, sender=Transaction)
def update_transaction_save(sender, instance, **kwargs):
    # print("Update transaction save is running")
    for acc in Account.objects.all():
        if instance.debit == acc or instance.credit == acc:
            # Update the balance for each account
            balance = acc.get_account_balance()
            r_balance = acc.get_reconcilliation_balance()
            
            thisAccount = Account.objects.filter(id=acc.id)
            thisAccount.update(balance=balance)

            # Update the reconciled balance for each account
            thisAccount.update(reconciled_balance=r_balance)

    print(instance.debit)
    #update all budgets
    for bud in Budget.objects.all():
        if instance.debit == bud.category or instance.credit == bud.category:
            actual = bud.get_actual()
            available = bud.get_available()
            thisBudget = Budget.objects.filter(id=bud.id)
            thisBudget.update(actual=actual)
            thisBudget.update(available=available)

@receiver(post_save, sender=Budget)
def update_budget_save(sender, instance, **kwargs):

    #update all budgets
    # for bud in Budget.objects.all().order_by('month'):
    #     if bud.category == instance.category:
    #         actual = bud.get_actual()
    #         available = bud.get_available()
    #         thisBudget = Budget.objects.filter(id=bud.id)
    #         thisBudget.update(actual=actual)
    #         thisBudget.update(available=available)
    # previous_available = 0
    for bud in Budget.objects.filter(category=instance.category).order_by('month'):
        actual = bud.get_actual()
        available = float(bud.get_available()) #+ float(previous_available)
        # previous_available = available
        # print("previous_available", previous_available)

        Budget.objects.filter(id=bud.id).update(actual=actual, available=available)





#Every time a transaction is updated, update the 'actual' field for budgets on those categories
@receiver(post_save, sender=Transaction)
def update_budget_actual(sender, instance, **kwargs):
    """
    Signal receiver to update the Budget actual field after a Transaction is saved.
    """
    debit_category = instance.debit  # Assuming the debit account determines the category
    credit_category = instance.credit
    # print("instance", instance.date)
    if instance.date:
        pass
        # print("Transaction date:", instance.date)
        # print("Year:", instance.date.year)
        # print("Month:", instance.date.month)
    if debit_category:
        budgets = Budget.objects.filter(
            month__year=instance.date.year,
            month__month=instance.date.month,
            category=debit_category,
        )
        for budget in budgets:
            budget.get_actual()
    elif credit_category:
        budgets = Budget.objects.filter(
            month__year=instance.date.year,
            month__month=instance.date.month,
            category=credit_category,
        )
        for budget in budgets:
            budget.get_actual()



#got chatgpt to write this for me
# @receiver(post_save, sender=Transaction)
# def update_budget_actual(sender, instance, **kwargs):
#     # Get the budget associated with the category and month of the saved transaction
#     credit = instance.credit
#     month = instance.date.month
#     year = instance.date.year

#     try:
#         budget = Budget.objects.get(category=credit, month=month, year=year)
#     except Budget.DoesNotExist:
#         # Handle the case where there is no budget for the given category and month
#         return

#     # Recalculate and update the actual balance for the found budget
#     budget.actual = budget.get_actual()
#     Budget.objects.filter(pk=budget.pk).update(actual=budget.actual)




@receiver(post_save, sender=Budget)
def set_budget_actual(sender, instance, **kwargs):
    instance.actual = instance.get_actual()
    Budget.objects.filter(pk=instance.pk).update(actual=instance.actual)


#Every time a budget is updated, recalculate the 'available' field
@receiver(post_save, sender=Budget)
def update_available(sender, instance, **kwargs):
    instance.available = instance.get_available()
    Budget.objects.filter(pk=instance.pk).update(available=instance.available)

#Update budget.Category_name everytime budget is updated
# @receiver(post_save, sender=Budget)
# def update_available(sender, instance, **kwargs):
#     instance.category_name = instance.get_category_name()
#     Budget.objects.filter(pk=instance.pk).update(category_name=instance.category_name)

# #Update budget.Category_name everytime budget is updated
# @receiver(post_save, sender=Transaction)
# def update_Reconcilliation(sender, instance, **kwargs):
#     # instance.category_name = instance.get_category_name()
#     Reconcilliation.objects.filter(pk=instance.reconcilliation.id).update(category_name=instance.category_name)