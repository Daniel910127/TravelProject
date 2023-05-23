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


from ..serializers import  AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer

from ..models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture
from ..utils import spot_data
from rest_framework.views import APIView
import json


# Create your views here.


@api_view(['POST'])
def create_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
    	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def account_login(request):
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'message': '資料格式不正確', 'setredirect': 0})

    username = data.get('username', None)
    password = data.get('password', None)

    try:
        user = Account.objects.get(a_Account=username, a_Password=password)
    except Account.DoesNotExist:
        return JsonResponse({'message': '帳號或密碼錯誤', 'setredirect': 0})

    serializer = AccountSerializer(user, many=False)
    whole = serializer.data
    a_Id = whole['a_Id']
    m_Id = whole['m_Id']
    a_Account = whole['a_Account']
    a_Password = whole['a_Password']
    a_Level = whole['a_Level']

    request.session['a_Id'] = a_Id
    request.session['m_Id'] = m_Id
    request.session['a_Account'] = a_Account
    # request.session['a_Password'] = a_Password
    request.session['a_Level'] = a_Level

    return JsonResponse({'message': '登入成功', 'setredirect': 1, 'redirect': '/home', 'a_Id': a_Id, 'm_Id': m_Id, 'a_Account': a_Account, 'a_Level': a_Level})


@api_view(['GET'])
def accountList(request):
	accounts = Account.objects.all().order_by('-a_Id')
	serializer = AccountSerializer(accounts, many=True)
	return Response(serializer.data)
