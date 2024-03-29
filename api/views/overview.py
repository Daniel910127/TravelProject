from django.shortcuts import render
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import AccountSerializer,SpotSerializer,s_InterestSerializer,FoodSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,a_PictureSerializer,f_PictureSerializer,h_PictureSerializer

from ..models import Account,Spot,Hotel,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,a_Picture,h_Picture
from ..utils import spot_data,food_data

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
  
	'Account List':'/account-list/',
  
    'Spot List':'/spot-list/',
    'Spot List With img':'spot/',
    'Spot Detail':'spot/<str:s_Name>/',
    
    'Food List':'/food-list/',
    'Food With Image List':'spot-image-list/',  
    
	'Hotel List':'/hotel-list/',    
	'Hotel With Image List':'hotel-image-list/',  

  	'Init Spot Data':'/init-spotData/',
    'Init s_Picture Data':'/init-spotPictureData/',
    'Init s_Stre Data':'/init-spotStreData/',
   
	'Init Food Data':'/init-foodData/',
    'Init f_Picture Data':'/init-foodPictureData/',
    'Init f_Stre Data':'/init-foodStreData/',
    
	'Init Hotel Data':'/init-hotelData/',
	'Init h_Picture Data':'/init-hotelPictureData/',
	'Init h_Stre Data':'/init-hotelStreData/',
    
		}
	return Response(api_urls)

