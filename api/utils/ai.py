from ..models import Spot
from ..serializers import SpotSerializer
from django.http import JsonResponse
from ..utils import ai_test


interest_data = {}
playzone_data={}
custom = True


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