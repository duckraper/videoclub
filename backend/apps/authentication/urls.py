from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (MyTokenObtainPairView,
                    UserViewSet,
                    UserCRUDView,
                    RetrieveSelfUser
                    )

urlpatterns = [
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('auth/users/', UserViewSet.as_view(), name='users'),
    path('auth/users/<int:pk>/', UserCRUDView.as_view(), name='users-crud'),
    path('auth/users/profile/', RetrieveSelfUser.as_view(), name='user-profile'),
]
