from json.decoder import JSONDecodeError
from ..serializers import AccountSerializer
from ..models import Account
from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .. import models


from ..serializers import AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer

from ..models import Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture
from ..utils import spot_data
from rest_framework.views import APIView
import json
import requests


#接收ai_py傳過來的travel_list_detail資料
def get_travel_list_detail_data():

    url = "https://www.twtainan.net/data/attractions_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)
    return data


def spot_add():

    travel_list_detail = get_travel_list_detail_data()
    # print(spot_data_list)
    for i in range(len(get_travel_list_detail_data)):
        t_Id = travel_list_detail[i]['t_Id']
        s_Id = travel_list_detail[i]['s_Id']
        f_Id = travel_list_detail[i]['f_Id']
        h_Id = travel_list_detail[i]['h_Id']
        tl_TransportMode = travel_list_detail[i]['tl_TransportMode']
        tl_TransportTime = travel_list_detail[i]['tl_TransportTime']
        tl_StayTime = travel_list_detail[i]['tl_StayTime']
        tl_Day = travel_list_detail[i]['tl_Day']
        tl_Order = travel_list_detail[i]['tl_Order']
        tl_Notes = travel_list_detail[i]['tl_Notes']
        tl_score = travel_list_detail[i]['tl_score']

        models.Travel_List_Detail.objects.create(t_Id=t_Id, s_Id=s_Id, f_Id=f_Id, h_Id=h_Id, tl_TransportMode=tl_TransportMode, tl_StayTime=tl_StayTime, tl_TransportTime=tl_TransportTime,
                                   tl_Day=tl_Day, tl_Notes =tl_Notes , tl_Order=tl_Order,tl_score=tl_score)

    return HttpResponse('successfully travel_list_detail add')