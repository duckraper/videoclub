from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from apps.authentication.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass
