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
    path(
        "token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/logout/", LogoutView.as_view(), name="token_logout"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("me/", ManageUserProfileView.as_view(), name="manage_user"),
]
