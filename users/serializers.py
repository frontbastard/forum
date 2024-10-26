from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext as _
from rest_framework import serializers

from forum.models import Topic, Post
from forum_service import settings


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    topics_count = serializers.IntegerField(read_only=True)
    posts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "id", "email", "is_staff", "date_joined", "topics_count",
            "posts_count",
        )
        read_only_fields = ("id", "is_staff")


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("email", "password", "is_staff", "first_name", "last_name")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {
            "password": {
                "write_only": True,
                "min_length": 5,
                "style": {"input_type": "password"},
                "label": _("Password"),
            }
        }

        def create(self, validated_data):
            """Create a user with encrypted password."""
            return settings.AUTH_USER_MODEL.objects.create_user(
                **validated_data
            )

        def update(self, instance, validated_data):
            """Update a user with encrypted password."""
            password = validated_data.pop("password", None)
            user = super().update(instance, validated_data)

            if password:
                user.set_password(password)
                user.save()

            return user


class TopicSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ("id", "name")


class PostSimpleSerializer(serializers.ModelSerializer):
    short_content = serializers.SerializerMethodField(read_only=True)
    topic_id = serializers.PrimaryKeyRelatedField(
        source="topic", read_only=True
    )

    class Meta:
        model = Post
        fields = ("id", "short_content", "topic_id")

    def get_short_content(self, obj):
        return obj.content[:50] + "..." if len(
            obj.content
        ) > 50 else obj.content


class UserProfileSerializer(UserSerializer):
    topics = TopicSimpleSerializer(many=True, read_only=True)
    posts = PostSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "id", "is_staff", "first_name", "last_name", "email",
            "posts", "topics",
        )


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email address"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"),
                email=email,
                password=password,
            )

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs
