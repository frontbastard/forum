from django.urls import path
from rest_framework_simplejwt.views import (
    TokenVerifyView,
)

from users.views import (
    CreateUserView,
    ManageUserProfileView,
    LogoutView,
    CustomTokenRefreshView,
    CustomTokenObtainPairView,
)

app_name = "user"

urlpatterns = [
    path(
        "token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "token/refresh/", CustomTokenRefreshView.as_view(),
        name="token_refresh"
    ),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/logout/", LogoutView.as_view(), name="token_logout"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("me/", ManageUserProfileView.as_view(), name="manage_user"),
]
