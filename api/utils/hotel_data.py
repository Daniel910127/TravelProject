import requests
import xml.etree.ElementTree as ET
from django.http import HttpResponse
from .. import models
import re


def get_accommodation_data():

    url = "https://www.twtainan.net/data/accommodation_zh-tw.xml"
    response = requests.get(url)
    root = ET.fromstring(response.content)

    accommodation_data_list = []

    for item in root.iter('shop'):
        a_Name = item.find('name').text
        a_Summary = item.find('summary').text
        a_Introduction = item.find('introduction').text
        a_District = item.find('district').text
        a_Address = item.find('address').text
        a_Tel = item.find('tel').text
        a_Fax = item.find('fax').text
        a_Latitude = item.find('lat').text
        a_Longtitude = item.find('long').text
        a_OpenTime = item.find('opentime').text
        a_Category  = item.find('category').text
        a_UpdateTime = item.find('update_time').text
        accommodation_data_list.append({'a_Name': a_Name, 'a_Summary': a_Summary,
                                        'a_Introduction': a_Introduction, 'a_District': a_District,
                                        'a_Address': a_Address, 'a_Tel': a_Tel, 'a_Fax': a_Fax, 
                                        'a_Latitude': a_Latitude, 'a_Longtitude': a_Longtitude,'a_OpenTime': a_OpenTime,'a_Category': a_Category,
                                        'a_UpdateTime': a_UpdateTime})

    return accommodation_data_list


def hotel_add():

    accommodation_data_list = get_accommodation_data()

    for i in range(len(accommodation_data_list)):
        a_Name = accommodation_data_list[i]['a_Name']
        a_Summary = accommodation_data_list[i]['a_Summary']
        a_Introduction = accommodation_data_list[i]['a_Introduction']
        a_District = accommodation_data_list[i]['a_District']
        a_Address = accommodation_data_list[i]['a_Address']
        a_Tel = accommodation_data_list[i]['a_Tel']
        a_Fax = accommodation_data_list[i]['a_Fax']
        a_Latitude = accommodation_data_list[i]['a_Latitude']
        a_Longtitude = accommodation_data_list[i]['a_Longtitude']
        a_OpenTime = accommodation_data_list[i]['a_OpenTime']
        a_Category = accommodation_data_list[i]['a_Category']
        a_UpdateTime = accommodation_data_list[i]['a_UpdateTime']

        models.Hotel.objects.create( h_Name=a_Name, h_Summary=a_Summary, h_Introduction=a_Introduction,
                                             h_District=a_District, h_Address=a_Address, h_Tel=a_Tel,h_Fax=a_Fax,
                                              h_Latitude=a_Latitude,h_Longtitude =a_Longtitude,h_OpenTime =a_OpenTime,h_Category=a_Category ,h_UpdateTime=a_UpdateTime)
        
    return HttpResponse('successfully hotel add!')

"""
  h_Id = models.AutoField( primary_key=True)  
  h_Lang = models.CharField(max_length=10, null=False)
  h_Name = models.CharField(max_length=50, null=False)
  h_Summary =  models.CharField(max_length=400, null=False)
  h_Introduction =  models.TextField(max_length=400, null=False)
  h_OpenTime = models.CharField(max_length=2000, null=False)
  h_District = models.CharField(max_length=50, null=False)
  h_Address = models.CharField(max_length=100, null=False)
  h_Tel = models.CharField(max_length=20, null=False)
  h_Fax = models.CharField(max_length=50, null=False)
  h_Latitude = models.FloatField(max_length=10, null=False)
  h_Longtitude = models.FloatField(max_length=10, null=False)
  h_Services =models.CharField(max_length=100, null=False)
  h_Category = models.CharField(max_length=100, null=False)
  h_UpdateTime =models.CharField(max_length=50, null=False)
"""