from django.contrib import admin

from forum.models import Category, Topic, Post, PostVote


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = (
        "id", "name", "content", "category", "author", "created_at"
    )


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "topic", "content", "author", "created_at")


@admin.register(PostVote)
class PostVoteAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "value", "created_at")
