from json.decoder import JSONDecodeError
from ..serializers import AccountSerializer
from ..models import Account
from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from ..serializers import AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer

from ..models import Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture
from ..utils import spot_data
from rest_framework.views import APIView
import json


@api_view(['POST'])
def CreateMember(request):
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        m_Name = serializer.validated_data.get('username')
        m_Gender = serializer.validated_data.get('gender')
        m_Email = serializer.validated_data.get('email')
        m_Phone = serializer.validated_data.get('phone')
        member = Member.objects.create(
            m_Name=m_Name, m_Gender=m_Gender, m_Email=m_Email, m_Phone=m_Phone)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def MemberDetail(request):
    data = json.loads(request.body)
    m_Id = data.get('m_Id', None)
    try:
        member = Member.objects.get(m_Id=m_Id)
        serializer = MemberSerializer(member, many=False)
        return Response(serializer.data)
    except Member.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def MemberList(request):
	members = Member.objects.all().order_by('-m_Id')
	serializer = MemberSerializer(members, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def UpdateMember(request):
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        try:
            member = Member.objects.get(m_Id=request.data['m_Id'])
        except Member.DoesNotExist:
            return Response(status=404)
        member.m_Name = serializer.validated_data.get('m_Name', member.m_Name)
        member.m_Gender = serializer.validated_data.get(
            'm_Gender', member.m_Gender)
        member.m_Email = serializer.validated_data.get(
            'm_Email', member.m_Email)
        member.m_Phone = serializer.validated_data.get(
            'm_Phone', member.m_Phone)
        member.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
