from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status


from ..serializers import  AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, spotWithPictureURLSerializer

from ..models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture


class SpotDetailView(generics.RetrieveAPIView):
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