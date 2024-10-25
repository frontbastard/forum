from django.db.models import Count
from django.http import QueryDict
from rest_framework import generics, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from forum_service import settings
from users.serializers import (
    UserSerializer,
    AuthTokenSerializer,
    UserProfileSerializer, UserRegistrationSerializer,
)


class CreateUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        user_serializer = UserProfileSerializer(user)
        user_data = user_serializer.data

        return Response(
            data={
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": user_data,
            },
            status=status.HTTP_201_CREATED
        )


class LoginUserView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    serializer_class = AuthTokenSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            response = Response(status=status.HTTP_205_RESET_CONTENT)
            response.delete_cookie('refresh_token')
            return response

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ManageUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return settings.AUTH_USER_MODEL.objects.annotate(
            topics_count=Count("topics", distinct=True),
            posts_count=Count("posts", distinct=True),
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            refresh_token = response.data.get('refresh')
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='Lax'
            )
            del response.data['refresh']

        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        data = request.data.copy() if isinstance(
            request.data, QueryDict
        ) else request.data
        data['refresh'] = refresh_token
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(
            serializer.validated_data, status=status.HTTP_200_OK
        )

        if response.status_code == status.HTTP_200_OK:
            new_refresh_token = response.data.get('refresh')
            response.set_cookie(
                key='refresh_token',
                value=new_refresh_token,
                httponly=True,
                samesite='Lax'
            )

            del response.data['refresh']

        return response
