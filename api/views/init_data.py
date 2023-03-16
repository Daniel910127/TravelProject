from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import TaskSerializer, AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer

from ..models import Task, Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture
from ..utils import spot_data,crawl_spot_image

# Create your views here.


@api_view(['GET'])
def spotInit(request):
	spot_data.spot_add()
	return HttpResponse('successfully spot add')


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
        
        s_Id  = Spot.objects.filter(s_Name = name).values()[0]['s_Id']
        s_Picture.objects.create(s_Id=s_Id,sp_URL = img_url)

  return HttpResponse('successfully spot image add')

	
