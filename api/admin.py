from django.contrib import admin

# Register your models here.

from .models import Task,Account

admin.site.register(Task)
admin.site.register(Account)