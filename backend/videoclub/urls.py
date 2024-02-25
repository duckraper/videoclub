from django.urls import path, include

urlpatterns = [
    path('api/', include('videoclub.api.urls')),
]
