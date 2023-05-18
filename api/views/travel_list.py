from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404


from ..serializers import  AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, spotWithPictureURLSerializer,Travel_List_TotalSerializer

from ..models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture

# Create your views here.


@api_view(['GET'])
def travel_List(request):
    tr_list = Travel_List.objects.all().order_by('-t_Id')
    serializer = Travel_ListSerializer(tr_list, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def travel_List_Total(request):
    travel_lists = Travel_List.objects.filter(travel_list_detail__s_Id__isnull=False).distinct()
    serializer = Travel_List_TotalSerializer(travel_lists, many=True)
    return Response(serializer.data)



