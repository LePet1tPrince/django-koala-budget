from django.contrib import admin
from .models import Account, Transaction, Budget, SubAccountType

class AccountAdmin(admin.ModelAdmin):
    pass

class SubAccountTypeAdmin(admin.ModelAdmin):
    pass

class TransactionAdmin(admin.ModelAdmin):
    pass

class BudgetAdmin(admin.ModelAdmin):
    pass

# class ReconcilliationAdmin(admin.ModelAdmin):
#     pass



admin.site.register(Account, AccountAdmin)
admin.site.register(SubAccountType, SubAccountTypeAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Budget, BudgetAdmin)
# admin.site.register(Reconcilliation, ReconcilliationAdmin)

