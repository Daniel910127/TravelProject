from django.urls import path
from .views import task,overview,spot,init_data,account,food,hotel


urlpatterns = [
    path('', overview.apiOverview, name="api-overview"),

    path('task-list/', task.taskList, name="task-list"),
    path('task-detail/<str:pk>/', task.taskDetail, name="task-detail"),
    path('task-create/', task.taskCreate, name="task-create"),

    path('task-update/<str:pk>/', task.taskUpdate, name="task-update"),
    path('task-delete/<str:pk>/', task.taskDelete, name="task-delete"),

    path('account-list/', account.accountList, name="account-list"),
    path('account-create/', account.create_account, name="account-create"),
    path('account-login/', account.login_account, name="account-login"),

    path('spot-list/', spot.spotList, name="spot-list"),
    path('spot/', spot.spotWithPictureList, name="spot-image-list"),
    path('spot/<str:s_Name>/', spot.spot_detail_view, name="spot-detail"),




    path('food-list/', food.foodList, name="food-list"),
    path('food-image-list/', food.foodWithPictureList, name="food-image-list"),
    
    path('hotel-list/', hotel.hotelList, name="hotel-list"),
    path('hotel-image-list/', hotel.hotelWithPictureList, name="hotel-image-list"),
  
  
    path('init-spotData/', init_data.spotInit, name="init-spotData"),
    path('init-spotPictureData/', init_data.spotPictureInit,
         name="init-spotPictureData"),
    path('init-spotStreData/', init_data.spotStreInit, name="init-spotlStreData"),

    path('init-foodData/', init_data.foodInit, name="init-foodData"),
    path('init-foodPictureData/', init_data.foodPictureInit,
         name="init-foodPictureData"),
    path('init-foodStreData/', init_data.foodStreInit, name="init-foodStreData"),

    path('init-hotelData/', init_data.hotelInit, name="init-hotelData"),
    path('init-hotelPictureData/', init_data.hotelPictureInit,
         name="init-hotelPictureData"),
    path('init-hotelStreData/', init_data.hotelStreInit, name="init-hotelStreData"),
    path('high_rating_spots/', spot.high_rating_spots, name="high_rating_spots"),


]
