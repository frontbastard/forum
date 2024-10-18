from django.contrib.auth.models import User
from rest_framework import serializers

from forum.models import Category, Post, Topic


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"


class PostListSerializer(PostSerializer):
    author_name = serializers.CharField(source="author", read_only=True)
    topic_name = serializers.CharField(source="topic", read_only=True)

    class Meta:
        model = Post
        fields = ("id", "author_name", "topic_name", "content")


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"

