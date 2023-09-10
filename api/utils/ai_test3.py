from ..models import Spot
from ..serializers import SpotSerializer
from django.http import JsonResponse

#能靖
def get_spot_json(data):
    spots = Spot.objects.all().order_by('-s_Id')
    serializer = SpotSerializer(spots, many=True)
    spot_json = serializer.data

    # 可以对 spot_json 进行进一步处理或返回
    return spot_json[data]
    # return spot_json
    # spot_json = get
    # _spot_json()
    # print(spot_json)


spot_json = get_spot_json(1)
# print(spot_json)

from ..models import s_Interest
from ..serializers import s_InterestSerializer

def get_s_Interest_json(data):
    Interests = s_Interest.objects.all().order_by('-si_Id')
    serializer = s_InterestSerializer(Interests, many=True)
    s_Interest_json = serializer.data

    return s_Interest_json

s_Interest_json = get_s_Interest_json(1)
# print(s_Interest_json)