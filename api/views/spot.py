from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated


from ..serializers import  AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, spotWithPictureURLSerializer

from ..models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture

# Create your views here.

@api_view(['GET'])
def spotList(request):
    spots = Spot.objects.all().order_by('-s_Id')
    serializer = SpotSerializer(spots, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def spotWithPictureList(request):
    queryset = Spot.objects.all()
    serializer = spotWithPictureURLSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def high_rating_spots(request):
    high_rating_spots = Spot.objects.filter( s_Reviews__gte=1000,s_Stars__gte=4.0).order_by( '-s_Reviews','-s_Stars')[:50]
    serializer = spotWithPictureURLSerializer(high_rating_spots, many=True)
    return Response(serializer.data)


""" @api_view(['GET'])  
def spot_detail(request, s_Name):
    queryset = Spot.objects.filter(s_Name=s_Name).first()
    print(queryset)
    serializer = spotWithPictureURLSerializer(queryset, many=False)
    
    return Response(serializer.data) """
#http://127.0.0.1:8000/api/spot/七股鹽山/  output:七股鹽山的資料(包含image url)

class SpotDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)     
    serializer_class = spotWithPictureURLSerializer

    def get(self, request, s_Id):
        try:
            my_model = Spot.objects.get(s_Id=s_Id)
            serializer = self.serializer_class(my_model)

            response_data = {
                "success": True,
                "message": "景點資料回傳成功",
                "data": serializer.data
            }
        except Spot.DoesNotExist:
            response_data = {
                "success": False,
                "message": "景點資料回傳失敗",
                "error": "指定的s_Id不存在"
            }

        return Response(response_data)
    
spot_detail_view = SpotDetailView.as_view()