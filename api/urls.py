from django.urls import path
from .views import task,overview,spot,init_data,account


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
  
  
  path('init-spotData/', init_data.spotInit, name="init-spotData"),
  path('init-spotPictureData/', init_data.spotPictureInit, name="init-spotPictureData"),
  
    
]
