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


def get_food_data():

    url = "https://www.twtainan.net/data/shops_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)
    return data


def food_add():

    food_data_list = get_food_data()
    # print(food_data_list)
    for i in range(len(food_data_list)):
        f_Lang = food_data_list[i]['lang']
        f_Name = food_data_list[i]['name']
        f_Summary = food_data_list[i]['summary']
        # f_Introduction = food_data_list[i]['introduction']
        f_Introduction = remove_specialCharacters(
            food_data_list[i]['introduction'])

        f_OpenTime = food_data_list[i]['open_time']
        f_District = food_data_list[i]['district']
        f_Address = food_data_list[i]['address']
        f_Tel = food_data_list[i]['tel']
        f_Fax = food_data_list[i]['fax']

        f_Latitude = food_data_list[i]['lat']
        if f_Latitude is None or f_Latitude == '': # f_Latitude==NULL -> continue
            continue
        f_Longtitude = food_data_list[i]['long']

        service_array = food_data_list[i]['services']
        f_Services = ",".join(service_array)

        category_array = food_data_list[i]['category']
        f_Category = ",".join(category_array)

        f_Consume = food_data_list[i]['consume']
        f_UpdateTime = food_data_list[i]['update_time']
    
        models.Food.objects.create(f_Lang=f_Lang, f_Name=f_Name, f_Summary=f_Summary, f_Introduction=f_Introduction, f_OpenTime=f_OpenTime, f_District=f_District, f_Address=f_Address,
                                   f_Fax=f_Fax, f_Tel=f_Tel, f_Latitude=f_Latitude, f_Longtitude=f_Longtitude, f_Services=f_Services, f_Category=f_Category,f_Consume=f_Consume ,f_UpdateTime=f_UpdateTime)

    return HttpResponse('successfully food add')


""" 
  f_Id = models.AutoField( primary_key=True) 
  f_Lang = models.CharField(max_length=10, null=False)
  f_Name = models.CharField(max_length=50, null=False)
  f_Summary =  models.CharField(max_length=400, null=False)
  f_Introduction =  models.TextField(max_length=400, null=False)
  f_OpenTime = models.CharField(max_length=2000, null=False)
  f_District = models.CharField(max_length=50, null=False)
  f_Address = models.CharField(max_length=100, null=False)
  f_Tel = models.CharField(max_length=20, null=False)
  f_Fax = models.CharField(max_length=50, null=False)
  f_Latitude = models.FloatField(max_length=10, null=False)
  f_Longtitude = models.FloatField(max_length=10, null=False)
  f_Services =models.CharField(max_length=100, null=False)
  f_Category = models.CharField(max_length=100, null=False)
  f_Consume = models.CharField(max_length=20, null=False)
  f_UpdateTime =models.CharField(max_length=50, null=False)
 """
