from django.urls import path, include
from budget import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('transactions/', include('tracking.urls_transaction')),
    path('accounts/', include('tracking.urls_account')),

    path('sub-accounts/', views.getSubAccounts, name="sub-accounts"),

    path('budget/', include('budget.urls')),
    path('reports/', include('reports.urls')),




    # path('dashboard/income/<str:yr>/<str:mnth>', views.getIncomeChartByMonth, name="income-chart"),
    # path('dashboard/expense/<str:yr>/<str:mnth>', views.getExpenseChartByMonth, name="expense-chart"),

    # path('reports/<str:start>/<str:end>', views.getRangeReport, name="range-report"),
    # path('reports/day-activity/<str:start>/<str:end>', views.getActiveityByDay, name="day-activity"),

    # path('cumulative-reports/<str:end>', views.getCumulativeReport, name="cumulative-report"),

    # path('month-data/', views.getMonthData, name="month-data"),
    # path('month-data/<str:yr>/<str:mnth>', views.getSingleMonthData, name="single-month-data"),



]