
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from ..serializers import AccountSerializer,SpotSerializer,MemberSerializer,s_InterestSerializer,FoodSerializer,HotelSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,m_PictureSerializer,foodWithPictureURLSerializer,hotelWithPictureURLSerializer

from ..models import Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture,Hotel,h_Picture

# Create your views here.

@api_view(['GET'])
def hotelList(request):
	hotels = Hotel.objects.all().order_by('-h_Id')
	serializer = HotelSerializer(hotels, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def hotelWithPictureList(request):
	queryset = Hotel.objects.all()
	serializer = hotelWithPictureURLSerializer(queryset, many=True)
	return Response(serializer.data)

class HotelDetailView(generics.RetrieveAPIView):
    serializer_class = hotelWithPictureURLSerializer

    def get(self, request, h_Id):
        try:
            my_model = Hotel.objects.get(h_Id=h_Id)
            serializer = self.serializer_class(my_model)

            response_data = {
                "success": True,
                "message": "住宿資料回傳成功",
                "data": serializer.data
            }
        except Hotel.DoesNotExist:
            response_data = {
                "success": False,
                "message": "住宿資料回傳失敗",
                "data": {}
            }

        return Response(response_data)
    
hotel_detail_view = HotelDetailView.as_view()