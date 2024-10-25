from django.db import transaction
from django.db.models import F, Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from forum.models import Category, Topic, Post, PostLike
from forum.serializers import (
    CategorySerializer,
    TopicSerializer,
    PostSerializer,
    PostListSerializer,
    TopicDetailSerializer,
    CategoryDetailSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.action in ("retrieve",):
            serializer_class = CategoryDetailSerializer

        return serializer_class


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action in ("list", "retrieve"):
            queryset = queryset.select_related("author", "category").annotate(
                posts_count=Count("posts")
            ).annotate(
                author_topics_count=Count("author__topics", distinct=True),
                author_posts_count=Count("author__posts", distinct=True)
            )

        return queryset

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.action in ("retrieve",):
            serializer_class = TopicDetailSerializer

        return serializer_class

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        data["author"]["topics_count"] = instance.author_topics_count
        data["author"]["posts_count"] = instance.author_posts_count

        return Response(data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action in ("list", "retrieve"):
            queryset = queryset.select_related("author", "topic")

        return queryset

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.action in ("list",):
            serializer_class = PostListSerializer

        return serializer_class

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=["POST"])
    def like(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        with transaction.atomic():
            if PostLike.objects.filter(user=user, post=post).exists():
                PostLike.objects.filter(user=user, post=post).delete()
            else:
                PostLike.objects.create(user=user, post=post)

            total_likes = PostLike.objects.filter(post=post).count()

        return Response({"status": "Vote applied", "likes": total_likes})
