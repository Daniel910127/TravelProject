from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import TaskSerializer, AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, h_PictureSerializer

from ..models import Task, Account, Spot, Member, s_Interest,Hotel, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture,f_Picture,h_Picture
from ..utils import spot_data,food_data,hotel_data,crawl_spot_image,crawl_food_image,crawl_hotel_image,crawl_food_stars_reviews,crawl_hotel_stars_reviews

# Create your views here.


@api_view(['GET'])
def spotInit(request):
	spot_data.spot_add()
	return HttpResponse('successfully spot add')

@api_view(['GET'])
def foodInit(request):
	food_data.food_add()
	return HttpResponse('successfully food add')

@api_view(['GET'])
def hotelInit(request):
	hotel_data.hotel_add()
	return HttpResponse('successfully hotel add')

@api_view(['GET'])
def spotPictureInit(request):
  spot_list = crawl_spot_image.get_spot_list()
  driver = crawl_spot_image.init_browser()
  #print(spot_list)

  for i in range(0,len(spot_list)):
    keyword = spot_list[i]['name']
    crawl_list = crawl_spot_image.crawler(keyword,driver)
    #print(crawl_list)
    for c in crawl_list:
        name = c['name']
        img_url = c['img_url']
        
        if s_Picture.objects.filter(sp_URL =img_url).exists() :
          print('url exist')
          continue
        
        s_Id  = Spot.objects.filter(s_Name = name).values()[0]['s_Id'] # if wrong ,then s_Id  = Spot.objects.filter(s_Name = name).first()
        s_Picture.objects.create(s_Id=s_Id,sp_URL = img_url)

  return HttpResponse('successfully spot image add')

@api_view(['GET'])
def foodPictureInit(request):
  food_list = crawl_food_image.get_food_list()
  driver = crawl_food_image.init_browser()
  #print(food_list)

  for i in range(0,len(food_list)):
    keyword = food_list[i]['name']
    crawl_list = crawl_food_image.crawler(keyword,driver)
    #print(crawl_list)
    for c in crawl_list:
        name = c['name']
        img_url = c['img_url']
        
        if f_Picture.objects.filter(fp_URL =img_url).exists() :
          print('url exist')
          continue
        
        f_Id  = Food.objects.filter(f_Name = name).values()[0]['f_Id'] # if wrong ,then f_Id  =  Food.objects.filter(s_Name = name).first()
        f_Picture.objects.create(f_Id=f_Id,fp_URL = img_url)

  return HttpResponse('successfully food image add')


@api_view(['GET'])
def hotelPictureInit(request):
  hotel_list = crawl_hotel_image.get_hotel_list()
  driver = crawl_hotel_image.init_browser()
  #print(hotel_list)

  for i in range(13,len(hotel_list)):
    keyword = hotel_list[i]['name']
    crawl_list = crawl_hotel_image.crawler(keyword,driver)
    #print(crawl_list)
    for c in crawl_list:
        name = c['name']
        img_url = c['img_url']
        
        if h_Picture.objects.filter(hp_URL =img_url).exists() :
          print('url exist')
          continue
        
        Id  = Hotel.objects.filter(h_Name = name).values()[0]['h_Id']# if wrong ,then h_Id  =  Hotel.objects.filter(h_Name = name).first()
        h_Picture.objects.create(h_Id=Id,hp_URL = img_url)

  return HttpResponse('successfully hotel image add')

@api_view(['GET'])
def foodStreInit(request):
  food_list = crawl_food_image.get_food_list()
  driver = crawl_food_image.init_browser()
  #print(food_list)

  for i in range(0,len(food_list)):
    keyword = food_list[i]['name']
    address = food_list[i]['address']
    crawl_food_stars_reviews.crawler(keyword,address,driver)

  return HttpResponse('successfully food image add')

@api_view(['GET'])
def hotelStreInit(request):
  hotel_list = crawl_hotel_image.get_hotel_list()
  driver = crawl_hotel_image.init_browser()
  #print(food_list)

  for i in range(0,len(hotel_list)):
    keyword = hotel_list[i]['name']
    address = hotel_list[i]['address']
    crawl_hotel_stars_reviews.crawler(keyword,address,driver)

  return HttpResponse('successfully hotel stre add')
