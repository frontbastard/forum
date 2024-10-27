from rest_framework import permissions


class IsAuthorOrStaffOrReadOnly(permissions.BasePermission):
    """
    Permission that allows its author or a staff member to edit or delete an object.
    Read-only access is allowed for all users.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user or request.user.is_staff


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Permission that allows a user with the is_staff status to edit or delete an object.
    Read-only access is allowed for all users.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff
