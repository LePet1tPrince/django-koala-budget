from django.urls import path, include
from budget import views

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('transactions/', include('tracking.urls_transaction')),
    path('accounts/', include('tracking.urls_account')),

    path('budget/', include('budget.urls')),
    path('reports/', include('reports.urls')),




]