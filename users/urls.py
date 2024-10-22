from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenObtainPairView,
)

from users.views import (
    CreateUserView,
    ManageUserProfileView,
    LogoutView,
)

app_name = "user"

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="register"),
    path(
        "token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("me/", ManageUserProfileView.as_view(), name="manage_user"),
    path("logout-token/", LogoutView.as_view(), name="logout_token"),
]
