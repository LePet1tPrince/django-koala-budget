from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('transactions/', views.getTransactions, name="transactions"),
    path('transactions/createmultiple', views.BatchCreateTransactionView, name="create-transactions"),

    path('transactions/accounts/<str:id>', views.getFilteredTransactions, name="transactions-by-account"),

    path('transactions/update/<str:pk>', views.updateTransaction, name="update-transaction"),

    path('transactions/delete/<str:id>', views.deleteTransaction, name="delete-transaction"),
    path('transactions/<str:pk>', views.getTransaction, name="transaction"),


    path('accounts/', views.getAccounts, name="accounts"),
    path('accounts/<str:pk>', views.getAccount, name="account"),
    path('accounts/update/<str:pk>', views.updateAccount, name="update-account"),
    path('accounts/delete/<str:pk>', views.deleteAccount, name="delete-account"),

    path('sub-accounts/', views.getSubAccounts, name="sub-accounts"),



    path('budget/', views.getBudgets, name='budgets'),
    # path('budget/<str:pk>', views.getBudget, name='budget'),
    path('budget/month/<str:yr>/<str:mnth>',views.getBudgetByMonth, name='budget-by-month'),
    path('budget/new-month', views.postBatchBudget, name='budget-new-month'),
    path('budget/update/<str:pk>', views.updateBudget, name='update-budget'),

    # path('budget/<str:pk>/delete', views.deleteBudget, name='delete-budget'),

    path('goals/', views.getGoals, name='goals'),
    path('goals/update/<str:pk>', views.updateGoals, name='update-goals'),


    path('dashboard/income/<str:yr>/<str:mnth>', views.getIncomeChartByMonth, name="income-chart"),
    path('dashboard/expense/<str:yr>/<str:mnth>', views.getExpenseChartByMonth, name="expense-chart"),

    path('reports/<str:start>/<str:end>', views.getRangeReport, name="range-report"),



    # path('reconcilliation/', views.getReconcilliations, name="reconcilliations"),






]