import requests
import json
from django.shortcuts import render, HttpResponse
from .. import models
import re


def remove_specialCharacters(str):

    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', str)


def get_spot_data():

    url = "https://www.twtainan.net/data/attractions_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)
    return data


def spot_add():

    spot_data_list = get_spot_data()
    # print(spot_data_list)
    for i in range(len(spot_data_list)):
        s_Lang = spot_data_list[i]['lang']
        s_Name = spot_data_list[i]['name']
        s_Summary = spot_data_list[i]['summary']
        # s_Introduction = spot_data_list[i]['introduction']
        s_Introduction = remove_specialCharacters(
            spot_data_list[i]['introduction'])

        s_OpenTime = spot_data_list[i]['open_time']
        s_District = spot_data_list[i]['district']
        s_Address = spot_data_list[i]['address']
        s_Tel = spot_data_list[i]['tel']
        s_Fax = spot_data_list[i]['fax']
        s_Tel = spot_data_list[i]['tel']
        s_Latitude = spot_data_list[i]['lat']
        s_Longtitude = spot_data_list[i]['long']

        service_array = spot_data_list[i]['services']
        s_Services = ",".join(service_array)

        category_array = spot_data_list[i]['category']
        s_Category = ",".join(category_array)

        s_UpdateTime = spot_data_list[i]['update_time']

        models.Spot.objects.create(s_Lang=s_Lang, s_Name=s_Name, s_Summary=s_Summary, s_Introduction=s_Introduction, s_OpenTime=s_OpenTime, s_District=s_District, s_Address=s_Address,
                                   s_Fax=s_Fax, s_Tel=s_Tel, s_Latitude=s_Latitude, s_Longtitude=s_Longtitude, s_Services=s_Services, s_Category=s_Category, s_UpdateTime=s_UpdateTime)

    return HttpResponse('successfully spot add')


""" s_Id = models.AutoField( primary_key=True) 
  s_Lang = models.CharField(max_length=10, null=False)
  s_Name = models.CharField(max_length=50, null=False)
  s_Summary =  models.CharField(max_length=400, null=False)
  s_Introduction =  models.TextField(max_length=400, null=False)
  s_OpenTime = models.CharField(max_length=2000, null=False)
  s_District = models.CharField(max_length=50, null=False)
  s_Address = models.CharField(max_length=100, null=False)
  s_Tel = models.CharField(max_length=20, null=False)
  s_Fax = models.CharField(max_length=50, null=False)
  s_Latitude = models.FloatField(max_length=10, null=False)
  s_Longtitude = models.FloatField(max_length=10, null=False)
  s_Services =models.CharField(max_length=100, null=False)
  s_Category = models.CharField(max_length=100, null=False)
  s_UpdateTime =models.CharField(max_length=50, null=False)  """
