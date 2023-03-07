from django.contrib import admin

# Register your models here.

from .models import Task,Account,Spot,Member

admin.site.register(Task)
admin.site.register(Account)
admin.site.register(Spot)
admin.site.register(Member)