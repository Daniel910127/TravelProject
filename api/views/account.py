from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from ..serializers import AccountSerializer,SpotSerializer,MemberSerializer,s_InterestSerializer,FoodSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,m_PictureSerializer

from ..models import Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture
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
def login_account(request):
    data = json.loads(request.body)
    username = data.get('username', None)
    password = data.get('password', None)
    user = authenticate(request, a_Account=username, a_Password=password)
    if user is not None:
        request.session['username'] = username
        return JsonResponse({'message': '登入成功', 'redirect': '/home', 'username': username})
    else:
        return JsonResponse({'message': '帳號或密碼錯誤'})

@api_view(['GET'])
def accountList(request):
	accounts = Account.objects.all().order_by('-a_Id')
	serializer = AccountSerializer(accounts, many=True)
	return Response(serializer.data)


