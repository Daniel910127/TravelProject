from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404


from ..serializers import  Travel_List_TotalSerializer,Travel_ListSerializer

from ..models import Travel_List

# Create your views here.

@api_view(['GET'])
def travel_List_Total(request):
    travel_lists = Travel_List.objects.filter(travel_list_detail__s_Id__isnull=False).distinct()
    serializer = Travel_List_TotalSerializer(travel_lists, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def CreateTravelList(request):
    serializer = Travel_ListSerializer(data=request.data)
    if serializer.is_valid():
        m_Id = serializer.validated_data.get('m_Id')
        t_Name = serializer.validated_data.get('t_Name')
        t_Description = serializer.validated_data.get('t_Description')
        t_FormTime = serializer.validated_data.get('t_FormTime')
        t_StartDate = serializer.validated_data.get('t_StartDate')
        t_EndDate = serializer.validated_data.get('t_EndDate')
        t_StayDay = serializer.validated_data.get('t_StayDay')
        t_Privacy = serializer.validated_data.get('t_Privacy')
        t_Views = serializer.validated_data.get('t_Views')
        t_Likes = serializer.validated_data.get('t_Likes')
        t_score = serializer.validated_data.get('t_score')   

        travellist = Travel_List.objects.create(
            m_Id=m_Id, t_Name=t_Name, t_Description=t_Description, 
            t_FormTime=t_FormTime, t_StartDate=t_StartDate, t_EndDate=t_EndDate,
            t_StayDay=t_StayDay, t_Privacy=t_Privacy, t_Views=t_Views, t_Likes= t_Likes,
            t_score=t_score
            )
        response_data = {
            "success": True,
            "message": "行程表創建成功",
            "data": serializer.data
        }
        return Response(response_data)
    else:
        response_data = {
            "success": False,
            "message": "行程表創建失敗",
            "errors": serializer.errors
        }
        return Response(response_data)

class TravelListView(generics.RetrieveAPIView):
    serializer_class = Travel_List_TotalSerializer

    def get(self, request, m_Id):
        my_models = Travel_List.objects.filter(m_Id=m_Id)
        if not my_models:
            response_data = {
                "success": False,
                "message": "行程表資料回傳失敗",
                "error": "指定的m_Id不存在"
            }
        else:
            serializer = self.serializer_class(my_models, many=True)
            response_data = {
                "success": True,
                "message": "行程表資料回傳成功",
                "data": serializer.data
            }

        return Response(response_data)

travel_List_detail_view = TravelListView.as_view()
