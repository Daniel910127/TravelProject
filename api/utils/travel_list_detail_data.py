import requests
import json
from django.shortcuts import render, HttpResponse
from .. import models
import re

#能靖改travel list spot輸入
def get_travel_list_detail_data():
    #拿travel_list資料
    url = "https://www.twtainan.net/data/attractions_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)
    return data


def travel_list_detail_data_add():

    travel_list_detail_data_list = get_travel_list_detail_data()
    # print(spot_data_list)
    for i in range(len(travel_list_detail_data_list)):
        t_Id  = travel_list_detail_data_list[i]['t_id']
        s_Id =  travel_list_detail_data_list[i]['s_id']  
        f_Id =  ['NULL']
        h_Id =  ['NULL']
        tl_TransportMode = ['car']
        tl_TransportTime = travel_list_detail_data_list[i]['tl_TransportTime']  
        tl_StayTime =  ['3600']
        tl_Day = travel_list_detail_data_list[i]['tl_Day']
        tl_Order = [i+1]
        tl_Notes = ['NULL']
        tl_score = [0]

        models.Travel_List_Detail.objects.create(t_Id=t_Id, s_Id=s_Id, f_Id=f_Id, h_Id=h_Id,tl_TransportMode=tl_TransportMode, tl_TransportTime=tl_TransportTime, tl_StayTime=tl_StayTime,
                                   tl_Day=tl_Day, tl_Notes=tl_Notes,tl_Order=tl_Order, tl_score=tl_score)

    return HttpResponse('successfully travel_list_detail_data_add add')