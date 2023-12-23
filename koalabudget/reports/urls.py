from django.urls import path, include
from budget import views

urlpatterns = [

    path('income/<str:yr>/<str:mnth>', views.getIncomeChartByMonth, name="income-chart"),
    path('expense/<str:yr>/<str:mnth>', views.getExpenseChartByMonth, name="expense-chart"),

    path('range/<str:start>/<str:end>', views.getRangeReport, name="range-report"),
    path('day-activity/<str:start>/<str:end>', views.getActiveityByDay, name="day-activity"),

    path('cumulative/<str:end>', views.getCumulativeReport, name="cumulative-report"),

    path('month-data/', views.getMonthData, name="month-data"),
    path('month-data/<str:yr>/<str:mnth>', views.getSingleMonthData, name="single-month-data"),



]