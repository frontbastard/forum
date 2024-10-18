from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TopicViewSet, PostViewSet

app_name = "forum"

router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"topics", TopicViewSet)
router.register(r"posts", PostViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
