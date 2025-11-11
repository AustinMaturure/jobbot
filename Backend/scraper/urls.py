from django.urls import path, include

urlpatterns = [
    path('api/', include('scraper.api.urls'))
]
