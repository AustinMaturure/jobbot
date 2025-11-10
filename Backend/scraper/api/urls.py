from . import views
from django.urls import path

urlpatterns = [
    path('api', views.scrapeSite)
]
