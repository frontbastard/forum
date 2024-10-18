from django.shortcuts import render
from rest_framework import viewsets

from forum.models import Category, Topic, Post
from forum.serializers import (
    CategorySerializer,
    TopicSerializer,
    PostSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action in ("list", "retrieve"):
            queryset = queryset.select_related("author", "category")

        return queryset


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action in ("list", "retrieve"):
            queryset = queryset.select_related("author", "topic")

        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
