from django.contrib import admin
from .models import Account, Transaction

class AccountAdmin(admin.ModelAdmin):
    pass

class TransactionAdmin(admin.ModelAdmin):
    pass

# Register your models here.

admin.site.register(Account, AccountAdmin)
admin.site.register(Transaction, TransactionAdmin)