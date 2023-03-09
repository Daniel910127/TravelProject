from django.contrib import admin

# Register your models here.

from .models import Task,Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture

admin.site.register(Task)
admin.site.register(Account)
admin.site.register(Spot)
admin.site.register(Member)
admin.site.register(s_Picture)
admin.site.register(s_Interest)
admin.site.register(Food)
admin.site.register(Travel_List)
admin.site.register(Travel_List_Detail)
admin.site.register(Question)
admin.site.register(m_Picture)
