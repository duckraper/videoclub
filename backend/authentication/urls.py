from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

from .views import (MyTokenObtainPairView,
                    UserViewSet,
                    UserCRUDView,
                    RetrieveSelfUser
                    )


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/', UserViewSet.as_view(), name='users'),
    path('users/<int:pk>/', UserCRUDView.as_view(), name='users-crud'),
    path('users/profile/', RetrieveSelfUser.as_view(), name='user-profile'),
]
