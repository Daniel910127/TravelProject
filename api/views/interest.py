from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404


from ..serializers import  AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, spotWithPictureURLSerializer

from ..models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture

# Create your views here.


@api_view(['GET'])
def interestList(request):
    interests = s_Interest.objects.all().order_by('-si_Id')
    serializer = s_InterestSerializer(interests, many=True)
    return Response(serializer.data)