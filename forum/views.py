from django.shortcuts import render
from rest_framework import viewsets

from forum.models import Category, Topic, Post
from forum.serializers import (
    CategorySerializer,
    TopicSerializer,
    PostSerializer,
    PostListSerializer, TopicDetailSerializer, CategoryDetailSerializer,
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
            queryset = queryset.select_related("author", "category")

        return queryset

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.action in ("retrieve",):
            serializer_class = TopicDetailSerializer

        return serializer_class


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
# test
