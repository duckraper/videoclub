from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.authentication.api.views import (
    MyTokenObtainPairView,
    UserViewSet,
    UserCRUDView,
    RetrieveSelfUser,
    LogoutView
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('logout/', LogoutView.as_view(), name='logout'),

    path('users/', UserViewSet.as_view(), name='users'),
    path('users/<int:pk>/', UserCRUDView.as_view(), name='users-crud'),
    path('users/me/', RetrieveSelfUser.as_view(), name='user-profile'),
]
