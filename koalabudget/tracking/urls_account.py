from django.urls import path
from . import views

urlpatterns = [
    path('', views.getAccounts, name="accounts"),
    path('<str:pk>', views.getAccount, name="account"),
    path('update/<str:pk>', views.updateAccount, name="update-account"),
    path('delete/<str:pk>', views.deleteAccount, name="delete-account"),


]