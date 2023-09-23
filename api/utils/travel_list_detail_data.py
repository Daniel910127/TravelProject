import requests
import json
from django.shortcuts import render, HttpResponse
from .. import models
import re

#能靖改travel list spot輸入+StartTime輸入
def get_travel_list_detail_data():
    #拿travel_list資料
    url = "https://www.twtainan.net/data/attractions_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)
    return data


def travel_list_detail_data_add(data):
    travel_list_detail_data_list = json.loads(data)
    
    #travel_list_detail_data_list = get_travel_list_detail_data()
    for i in range(len(travel_list_detail_data_list)):
        #print(travel_list_detail_data_list[i])
        
        t_Id  = travel_list_detail_data_list[i]['t_id']
        s_Id =  travel_list_detail_data_list[i]['s_id']  
        f_Id =  None#['NULL']
        h_Id =  None#['NULL']
        tl_TransportMode = ['car']
        tl_TransportTime = int(travel_list_detail_data_list[i]['tl_TransportTime']  * 60)
        tl_StayTime =  7200#['7200']
        tl_Day = travel_list_detail_data_list[i]['tl_Day']
        tl_Order = i+1#[i+1]
        tl_Notes = None#['NULL']
        tl_score = 0#[0]

        models.Travel_List_Detail.objects.create(t_Id_id=t_Id, s_Id_id=s_Id, f_Id_id=f_Id, h_Id_id=h_Id,tl_TransportMode=tl_TransportMode, tl_TransportTime=tl_TransportTime, tl_StayTime=tl_StayTime,
                                   tl_Day=tl_Day, tl_Notes=tl_Notes,tl_Order=tl_Order, tl_score=tl_score)

        
def travel_list_starttime_data_add(t_Id, tl_Day):
    tls_StartTime = 28800
        
    models.Travel_List_StartTime.objects.create(t_Id_id=t_Id,tls_Day=tl_Day,tls_StartTime=tls_StartTime)
            
    return HttpResponse('successfully travel_list_detail_data_add add') 