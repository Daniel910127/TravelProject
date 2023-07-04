from django.contrib import admin

# Register your models here.

from .models import Account,Spot,s_Interest,Food,Hotel,Travel_List,Travel_List_Detail,Travel_List_StartTime,Question,s_Picture,a_Picture,h_Picture,f_Picture,Like_Record

admin.site.register(Account)
admin.site.register(s_Picture)
admin.site.register(s_Interest)
admin.site.register(Spot)
admin.site.register(Food)
admin.site.register(Hotel)
admin.site.register(Travel_List)
admin.site.register(Travel_List_StartTime)
admin.site.register(Travel_List_Detail)
admin.site.register(Question)
admin.site.register(a_Picture)
admin.site.register(h_Picture)
admin.site.register(f_Picture)
admin.site.register(Like_Record)