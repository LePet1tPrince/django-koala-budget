from django.contrib import admin
from .models import Account, Transaction, Budget, Goal, Reconcilliation

class AccountAdmin(admin.ModelAdmin):
    pass

class TransactionAdmin(admin.ModelAdmin):
    pass

class BudgetAdmin(admin.ModelAdmin):
    pass

class GoalAdmin(admin.ModelAdmin):
    pass

class ReconcilliationAdmin(admin.ModelAdmin):
    pass

# Register your models here.

admin.site.register(Account, AccountAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Budget, BudgetAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(Reconcilliation, ReconcilliationAdmin)

