from rest_framework import serializers

from forum.models import Category, Post, Topic
from users.serializers import UserSerializer


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
        fields = (
            "id", "author_name", "topic_name", "content", "created_at",
            "updated_at",
        )


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        exclude = ("category",)


class TopicDetailSerializer(TopicSerializer):
    author = UserSerializer(read_only=True)
    posts = PostSerializer(many=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CategoryDetailSerializer(CategorySerializer):
    topics = TopicSerializer(many=True, read_only=True)
