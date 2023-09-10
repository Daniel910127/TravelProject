from ..models import Spot
from ..serializers import SpotSerializer
from django.http import JsonResponse
from ..utils import ai_test

#能靖改的ai.py
interest_data = {}
playzone_data={}
custom = True

def get_t_Id(data):
    t_Id=data
    print("t_Id:",t_Id)

def process_interest_data(data):
    global interest_data
    interest_data = data
    for key, value in interest_data.items():
        print(f"Interest {key}: {value}")

def process_playzone_data(data):
    global playzone_data
    playzone_data = data
    for zone in playzone_data:
        print("Playzone:", zone)
    print(custom)

def spotList():
    spots = Spot.objects.all().order_by('-s_Id')
    serializer = SpotSerializer(spots, many=True)
    return JsonResponse(serializer.data, safe=False)

def spotListid(s_id):
    spot=ai_test.get_spot_json(s_id)
    return spot

#能靖
# def if custom
#         智宣(tid,interest_data,playzone_data)
#         travel_list_detail_data.get_travel_list_detail_data():
#         travel_list_detail_data.travel_list_detail_data_add()
#     else
#         智宣(tid,playzone_data)
#         travel_list_detail_data.get_travel_list_detail_data():
#         travel_list_detail_data.travel_list_detail_data_add()