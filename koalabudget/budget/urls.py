from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('transactions/', views.getTransactions, name="transactions"),
    path('transactions/createmultiple', views.createTransactions, name="create-transactions"),

    path('transactions/accounts/<str:id>', views.getFilteredTransactions, name="transactions-by-account"),

    path('transactions/<str:pk>', views.getTransaction, name="transaction"),
    path('transactions/<str:pk>/update', views.updateTransaction, name="update-transaction"),
    path('transactions/<str:pk>/delete', views.deleteTransaction, name="delete-transaction"),


    path('accounts/', views.getAccounts, name="accounts"),
    path('accounts/<str:pk>', views.getAccount, name="account"),
    path('accounts/<str:pk>/update', views.updateAccount, name="update-account"),
    path('accounts/<str:pk>/delete', views.deleteAccount, name="delete-account"),


    path('budget/', views.getBudgets, name='budgets'),
    path('budget/<str:pk>', views.getBudget, name='budget'),
    path('budget/month/<str:yr>/<str:mnth>',views.getBudgetByMonth, name='budget-by-month'),
    # path('budget/<str:pk>/delete', views.deleteBudget, name='delete-budget'),
    # path('budget/<str:pk>/update', views.updateBudget, name='update-budget')

    path('dashboard/income/<str:yr>/<str:mnth>', views.getIncomeChartByMonth, name="income-chart"),
    path('dashboard/expense/<str:yr>/<str:mnth>', views.getExpenseChartByMonth, name="expense-chart"),






]