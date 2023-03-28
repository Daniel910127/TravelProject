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

    path('spot-list/', spot.spotList, name="spot-list"),
    path('spot-image-list/', spot.spotWithPictureList, name="spot-image-list"),

    path('food-list/', food.foodList, name="food-list"),
    path('food-image-list/', food.foodWithPictureList, name="food-image-list"),
    
	path('hotel-list/', hotel.hotelList, name="hotel-list"),
    path('hotel-image-list/', hotel.hotelWithPictureList, name="hotel-image-list"),
  
  
    path('init-spotData/', init_data.spotInit, name="init-spotData"),
    path('init-spotPictureData/', init_data.spotPictureInit, name="init-spotPictureData"),
    path('init-spotStreData/', init_data.spotStreInit, name="init-spotlStreData"),
    
	path('init-foodData/', init_data.foodInit, name="init-foodData"),
    path('init-foodPictureData/', init_data.foodPictureInit, name="init-foodPictureData"),
    path('init-foodStreData/', init_data.foodStreInit, name="init-foodStreData"),
    
	path('init-hotelData/', init_data.hotelInit, name="init-hotelData"),
    path('init-hotelPictureData/', init_data.hotelPictureInit, name="init-hotelPictureData"),
    path('init-hotelStreData/', init_data.hotelStreInit, name="init-hotelStreData"),
  
    
]
