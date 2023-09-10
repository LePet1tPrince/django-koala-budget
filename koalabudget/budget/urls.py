from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('transactions/', views.getTrxns, name="trxns"),
    # path('trxns/accounts/<str:id>', views.getFilteredTrxns, name="filtered-trxns"),

    # path('trxns/<str:pk>', views.getTrxn, name="trxn"),
    # path('trxns/<str:pk>/update', views.updateTrxn, name="update-trxn"),
    # path('trxns/<str:pk>/delete', views.deleteTrxn, name="delete-trxn"),


    # path('accounts/', views.getAccounts, name="accounts"),
    # path('accounts/<str:pk>', views.getAccount, name="account"),
    # path('accounts/<str:pk>/update', views.updateAccount, name="update-account"),
    # path('accounts/<str:pk>/delete', views.deleteAccount, name="delete-account"),


    # path('goals/', views.getGoals, name="goals"),

    # path('dashboard/<str:st_dt>_<str:end_dt>', views.getDashboard, name="dashboard"),
    # path('test/', views.test, name="test"),

    # path('budget/', views.getBudget, name='budget'),
    # path('budget/<str:yr>', views.getBudgetByYear, name='budget-by-year'),
    # path('budget/<str:pk>/delete', views.deleteBudget, name='delete-budget'),
    # path('budget/<str:pk>/update', views.updateBudget, name='update-budget')





]