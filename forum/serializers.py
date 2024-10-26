from django.db.models import Sum, Count
from rest_framework import serializers

from forum.models import Category, Post, Topic, PostLike
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    current_user_liked = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return obj.likes.count()

    def get_current_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return PostLike.objects.filter(
                user=request.user, post=obj
            ).exists()
        return False

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
            "updated_at", "likes",
        )


class TopicSerializer(serializers.ModelSerializer):
    posts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Topic
        fields = "__all__"


class TopicDetailSerializer(TopicSerializer):
    author = UserSerializer(read_only=True)
    posts = PostSerializer(many=True, read_only=True)


class TopicsForCategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Topic
        fields = ("id", "name", "posts_count", "created_at", "updated_at")


class CategorySerializer(serializers.ModelSerializer):
    topics = TopicsForCategorySerializer(many=True, read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        topics = instance.topics.annotate(posts_count=Count("posts"))
        representation["topics"] = TopicsForCategorySerializer(
            topics, many=True
        ).data
        return representation

    class Meta:
        model = Category
        fields = "__all__"


class CategoryDetailSerializer(CategorySerializer):
    topics = TopicSerializer(many=True, read_only=True)
