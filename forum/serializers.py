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


class TopicSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = "__all__"
