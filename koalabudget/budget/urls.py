from django.urls import path, include
from budget import views

urlpatterns = [

    path('', views.getBudgets, name='budgets'),
    path('month/<str:yr>/<str:mnth>',views.getBudgetByMonth, name='budget-by-month'),
    path('new-month', views.postBatchBudget, name='budget-new-month'),
    path('update/<str:pk>', views.updateBudget, name='update-budget'),
 



]