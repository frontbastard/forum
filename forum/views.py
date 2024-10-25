from django.db.models import F, Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from forum.models import Category, Topic, Post, PostVote
from forum.serializers import (
    CategorySerializer,
    TopicSerializer,
    PostSerializer,
    PostListSerializer, TopicDetailSerializer, CategoryDetailSerializer,
    VoteSerializer,
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
        posts = instance.posts.annotate(votes_sum=Sum("votes__value"))
        data["posts"] = PostSerializer(posts, many=True).data
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

        if self.action in ("vote",):
            serializer_class = VoteSerializer

        return serializer_class

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=["POST"])
    def vote(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        try:
            vote_value = int(request.data.get("vote_value"))
            if vote_value not in (1, -1):
                raise ValueError
        except (ValueError, TypeError):
            return Response(
                {"error": "Vote value must either be 1 or -1"},
                status=status.HTTP_400_BAD_REQUEST
            )

        post_vote, created = PostVote.objects.update_or_create(
            user=user, post=post, defaults={"value": vote_value}
        )

        if not created:
            if post_vote.value == vote_value:
                post_vote.delete()

        total_votes = post.votes.aggregate(total=Sum("value"))["total"] or 0
        return Response({"status": "Vote applied", "value": total_votes})
