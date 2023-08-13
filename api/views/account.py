from json.decoder import JSONDecodeError
from ..serializers import AccountSerializer
from ..models import Account
from django.http import Http404
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from datetime import datetime


from ..serializers import AccountSerializer, LoginSerializer

from ..models import Account
from ..utils import spot_data
from rest_framework.views import APIView
import json


# Create your views here.
class CreateAccountView(APIView):  # 創建帳號
    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.validated_data['account']
            password = serializer.validated_data['password']
            username = serializer.validated_data['username']
            if Account.objects.filter(username=username).exists():
                response_data = {
                    'message': '該名稱已被使用'
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            email = serializer.validated_data['email']
            if Account.objects.filter(email=email).exists():
                response_data = {
                    'meaasge': '該電子郵件已被使用'
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            rank = serializer.validated_data.get('rank', 0)

            # 使用AccountManager的create_user方法创建账户
            account = Account.objects.create_user(
                account=account, password=password, username=username, email=email, rank=rank)

            response_data = {
                "status": "201",
                "message": "帳號創建成功",
                "data": serializer.data
            }

            # 返回成功响应
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            response_data = {
                "status": "400",
                "message": "帳號創建失败",
                "error": serializer.errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):  # 登入帳號
    def post(self, request):
        data = json.loads(request.body)
        account = data.get('account')
        password = data.get('password')
        try:
            user = Account.objects.get(account=account)
            if user.check_password(password):
                user.last_login = datetime.now()
                user.save()
                refresh = RefreshToken.for_user(user)
                data = {
                    'status': "201",
                    'message': "帳號登入成功",
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'id': user.id,
                    'account': user.account,
                    'username': user.username,
                    'email': user.email
                }
                return JsonResponse(data=data)
            else:
                data = {
                    'status': "401",
                    'error': "密碼錯誤",
                }
                return JsonResponse(data=data)
        except Account.DoesNotExist:
            data = {
                'status': "401",
                'error': "帳號不存在",
            }
            return JsonResponse(data=data)


class UpdateAccountView(APIView):  # 更改帳號資訊
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Account.objects.get(id=id)
        except Account.DoesNotExist:
            raise Http404("帳號不存在")

    def check_duplicate_username(self, username, account):
        return Account.objects.filter(username=username).exclude(id=account.id).exists()

    def check_duplicate_email(self, email, account):
        return Account.objects.filter(email=email).exclude(id=account.id).exists()

    def get(self, request, id, format=None):
        account = self.get_object(id)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        try:
            account = self.get_object(id)
        except Http404 as e:
            return Response({'status': '404', 'message': '帳號不存在'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')

            if username and self.check_duplicate_username(username, account):
                errors = {
                    'status': "401",
                    'message': "會員更改失敗",
                    'errors': {'username': ['用户名已存在']}
                }
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)

            if email and self.check_duplicate_email(email, account):
                errors = {
                    'status': "401",
                    'message': "會員更改失敗",
                    'errors': {'email': ['电子邮件已存在']}
                }
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            data = {
                'status': "201",
                'message': "帳號更改成功",
                'data': serializer.data
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            errors = {
                'status': "401",
                'message': "會員更改失敗",
                'errors': serializer.errors
            }
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, id, format=None):
        return self.put(request, id, format)


@api_view(['GET'])
def accountList(request):
	accounts = Account.objects.all().order_by('-id')
	serializer = AccountSerializer(accounts, many=True)
	return Response(serializer.data)


class UpdateMemberView(APIView):  # 會員更新
    def post(self, request):
        data = json.loads(request.body)
        id = data.get('id')
        account = data.get('account')
        if Account.objects.filter(account=account).exclude(id=id).exists():
            data = {
                'message': '該帳戶已被使用'
            }
            return Response(data)
        username = data.get('username')
        email = data.get('email')
        if Account.objects.filter(email=email).exclude(id=id).exists():
            data = {
                'message': '該信箱已被使用'
            }
            return Response(data)
        try:
            user = Account.objects.get(id=id)
            user.account = account
            user.username = username
            user.email = email
            user.save()
            data = {
                'status': "201",
                'message': "會員更新成功",
                'id': user.id,
                'account': user.account,
                'username': user.username,
                'email': user.email
            }
            return JsonResponse(data=data)
        except Account.DoesNotExist:
            data = {
                'status': "401",
                'error': "會員更新失敗",
            }
            return JsonResponse(data=data, status=status.HTTP_404_NOT_FOUND)
