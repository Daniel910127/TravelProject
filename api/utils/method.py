
# 李誌軒

from ..models import Spot, s_Interest, Hotel, Food, Travel_List, Like_Record
from ..serializers import SpotSerializer, s_InterestSerializer, HotelSerializer, FoodSerializer, Travel_ListSerializer, Like_RecordSerializer
from django.http import JsonResponse
import numpy as np
from datetime import datetime
import math
import random

def get_interest_json(user_id, interest_list = None):
    user_interest = []
    if interest_list == None:
        Interests = s_Interest.objects.all().order_by('-si_Id')
        serializer = s_InterestSerializer(Interests, many=True)
        s_Interest_json = serializer.data

        for index, order_dict in enumerate(s_Interest_json):
            if order_dict['id'] == user_id:
                user_interest = [value for key, value in order_dict.items() if key != 'id' and key != 'si_Id']
    else:
        
        for keys, values in interest_list.items():
            if keys != "si_Id":
                user_interest.append(values)

    return user_interest

def get_spot_json(play_zone):
    spots = Spot.objects.all().order_by('-s_Id')
    serializer = SpotSerializer(spots, many=True)
    spot_json = serializer.data

    spots_name = list(spots.values_list('s_Name', flat=True))
    spots_district = list(spots.values_list('s_District', flat=True))
    spots_category  = list(spots.values_list('s_Category', flat=True))

    topic_matrix = []
    all_topics = ['溫泉度假', '風景區', '戶外運動', '在地藝文', '無障礙設施', '生態教育', '自然景觀', '休閒農漁', '公園綠地', '觀光工廠', '熱門景點', '歷史古蹟', '夜市夜遊', '主題園區', '消費娛樂', '宗教廟宇', '景觀吊橋', '地方展館']

    for spot in spots_category:
        input_types = spot.split(',')
        result_lists = [1 if topic in input_types else 0 for topic in all_topics]
        topic_matrix.append(result_lists)


    filtered_spot_name = []
    filtered_spot_json = []
    filtered_spot_topic = []
    
    for i in range(len(spots_name)):
        if spots_district[i] in play_zone:
            filtered_spot_name.append(spots_name[i])
            filtered_spot_json.append(spot_json[i])
            filtered_spot_topic.append(topic_matrix[i])
 
    if len(filtered_spot_name) <= 60:
        random_integers = [random.randint(0, len(spots_name)) for _ in range(60 - len(filtered_spot_name))]
        for j in range(len(random_integers)):
            filtered_spot_name.append(spots_name[j])
            filtered_spot_json.append(spot_json[j])
            filtered_spot_topic.append(topic_matrix[j])

    #return spot_json, spots_name, topic_matrix
    return filtered_spot_json, filtered_spot_name, filtered_spot_topic

def getspotbyid(spot_id, info):
    spots = Spot.objects.all().order_by('-s_Id')
    serializer = SpotSerializer(spots, many=True)
    spot_json = serializer.data 

    if info != "position":
        return spot_json[spot_id][info]
    else:
        return (spot_json[spot_id]["s_Latitude"], spot_json[spot_id]["s_Longitude"])

def get_hotel_json():
    hotels = Hotel.objects.all().order_by('-h_Id')
    serializer = HotelSerializer(hotels, many=True)
    hotel_json = serializer.data
    return hotel_json

def gethotelbyid(hotel_id, info):
    hotels = Hotel.objects.all().order_by('-h_Id')
    serializer = HotelSerializer(hotels, many=True)
    hotel_json = serializer.data

    if info != "position":
        return hotel_json[hotel_id][info]
    else:
        return (hotel_json[hotel_id]["h_Latitude"], hotel_json[hotel_id]["h_Longitude"])
    
def get_food_json():
    foods = Food.objects.all().order_by('-f_Id')
    serializer = FoodSerializer(foods, many=True)
    food_json = serializer.data
    return food_json

def getfoodbyid(food_id, info):
    foods = Food.objects.all().order_by('-f_Id')
    serializer = FoodSerializer(foods, many=True)
    food_json = serializer.data

    if info != "position":
        return food_json[food_id][info]
    else:
        return (food_json[food_id]["f_Latitude"], food_json[food_id]["f_Longitude"])
    
def get_tl_INFO(t_id): 
    tl = Travel_List.objects.all().order_by('-t_Id')
    serializer = Travel_ListSerializer(tl, many=True)
    tl = serializer.data

    for i in range(len(tl)):
        if tl[i]["t_Id"] == t_id:
            break

    t_StartDate = int(datetime.strptime(tl[i]["t_StartDate"], '%Y-%m-%d').weekday())
    t_StayDay = tl[i]["t_StayDay"]
    user_id = tl[i]["account"]
    staytime = [9] * t_StayDay #default


    playtime = {}
    for i in range(t_StayDay):
        if t_StartDate+i > 6:
            playtime[(t_StartDate+i) % 7] = staytime[i]
        else:
            playtime[t_StartDate+i] = staytime[i]

    return playtime, user_id

def haversine(coord1, coord2):
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = 6371 * c
    return distance

def transporttime(strt_id, des_id):
    strt_pos = getspotbyid(strt_id, "position") 
    des_pos = getspotbyid(des_id, "position")
    distance = haversine(strt_pos, des_pos)

    speed_kph = 40
    time_hours = distance / speed_kph
    return time_hours


def getlikedbyid(acc_id):
    liked = Like_Record.objects.all().order_by('-h_Id')
    serializer = Like_RecordSerializer(liked, many=True)
    liked_json = serializer.data
    likespots = []
    for i in range(len(liked_json)):
        if liked_json[i]["id"] == acc_id:
            likespots.append(liked_json[i]["s_Id"])

    return likespots

# print(getspotbyid(-193, "s_Name"))