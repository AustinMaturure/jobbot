from . import views
from django.urls import path

urlpatterns = [
    path('scrape/', views.scrapeSite)
]
