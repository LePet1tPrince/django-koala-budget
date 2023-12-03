from django.urls import path
from . import views

urlpatterns = [
    path('', views.getTransactions, name="transactions"),
    path('month/<str:yr>/<str:mnth>', views.getTransactionsByMonth, name="transactions-by-month"),

    path('createmultiple', views.BatchCreateTransactionView, name="create-transactions"),

    path('accounts/<str:id>', views.getFilteredTransactions, name="transactions-by-account"),

    path('update/<str:pk>', views.updateTransaction, name="update-transaction"),

    path('delete/<str:id>', views.deleteTransaction, name="delete-transaction"),
    path('<str:pk>', views.getTransaction, name="transaction"),


 
]