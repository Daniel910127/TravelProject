from ..serializers import s_InterestSerializer,AccountSerializer
from ..models import Account,s_Interest
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
import json


class InterestDetail(APIView):#哲嘉做的
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = json.loads(request.body)
        id = data.get('id', None)
        try:
            member = s_Interest.objects.get(id=id)
            serializer = s_InterestSerializer(member, many=False)
            return Response(serializer.data)
        except s_Interest.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "興趣資料獲取失敗",
                "error": "指定的id不存在"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)


class CreateInterestView(APIView):  # 帳號興趣創立
    def post(self, request):
        serializer = s_InterestSerializer(data=request.data)
        if serializer.is_valid():
            if Account.objects.filter(id=id).exists():
                return Response({'error': '該帳號已創立興趣'}, status=status.HTTP_400_BAD_REQUEST)
            id = serializer.validated_data.get('id')
            id = serializer.validated_data.get('id')
            si_pg = serializer.validated_data.get('si_pg')
            si_os = serializer.validated_data.get('si_os')
            si_tp = serializer.validated_data.get('si_tp')
            si_ee = serializer.validated_data.get('si_ee')
            si_ff = serializer.validated_data.get('si_ff')
            si_la = serializer.validated_data.get('si_la')
            si_le = serializer.validated_data.get('si_le')
            si_ns = serializer.validated_data.get('si_ns')
            si_np = serializer.validated_data.get('si_np')
            si_rt = serializer.validated_data.get('si_rt')
            si_se = serializer.validated_data.get('si_se')
            si_ha = serializer.validated_data.get('si_ha')
            si_tf = serializer.validated_data.get('si_tf')

            interest = s_Interest.objects.create(
                id=id,
                si_pg=si_pg,
                si_os=si_os,
                si_tp=si_tp,
                si_ee=si_ee,
                si_ff=si_ff,
                si_la=si_la,
                si_le=si_le,
                si_ns=si_ns,
                si_np=si_np,
                si_rt=si_rt,
                si_se=si_se,
                si_ha=si_ha,
                si_tf=si_tf
            )

            response_data = {
                "status": "201",
                "message": "帳號興趣創建成功",
                "data": serializer.data
            }

            # 返回成功响应
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            # 返回验证错误响应
            response_data = {
                "status": "400",
                "message": "帳號興趣創建失敗",
                "error": serializer.errors
            }

            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class UpdateInterestView(APIView):  # 帳號興趣修改
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            interest = s_Interest.objects.get(id=request.data['id'])
        except s_Interest.DoesNotExist:
            response_data = {
                "status": "404",
                'error': '帳號興趣不存在'
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        serializer = s_InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "status": "200",
                "message": "帳號興趣更新成功",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {
                "status": "400",
                "message": "帳號興趣更新失败",
                "error": serializer.errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class InterestListView(APIView):  # 單一帳號興趣與帳號資料查詢
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        try:
            # Retrieve the interest data for the account with the given id
            account_id = id
            interest = s_Interest.objects.get(id=account_id)
            
            # Retrieve the account data
            account = Account.objects.get(id=account_id)
            
            # Serialize both interest and account data
            interest_serializer = s_InterestSerializer(interest)
            account_serializer = AccountSerializer(account)
            
            response_data = {
                "status": "200",
                "message": "興趣與帳號資料獲取成功",
                "interest_data": interest_serializer.data,
                "account_data": account_serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            response_data = {
                "status": "404",
                "message": "興趣與帳號資料獲取失敗",
                "error": "指定的id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
