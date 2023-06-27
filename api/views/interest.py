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
def InterestDetail(request):
    data = json.loads(request.body)
    m_Id = data.get('m_Id', None)
    try:
        member = s_Interest.objects.get(m_Id=m_Id)
        serializer = s_InterestSerializer(member, many=False)
        return Response(serializer.data)
    except s_Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def InterestList(request):
	members = s_Interest.objects.all().order_by('-m_Id')
	serializer = s_InterestSerializer(members, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def UpdateInterest(request):
    serializer = s_InterestSerializer(data=request.data)
    if serializer.is_valid():
        try:
            interest = s_Interest.objects.get(m_Id=request.data['m_Id'])
        except s_Interest.DoesNotExist:
            return Response(status=404)
        interest.si_pg = serializer.validated_data.get(
            'si_pg', interest.si_pg)
        interest.si_os = serializer.validated_data.get(
            'si_os', interest.si_os)
        interest.si_tp = serializer.validated_data.get(
            'si_tp', interest.si_tp)
        interest.si_ee = serializer.validated_data.get(
            'si_ee', interest.si_ee)
        interest.si_ff = serializer.validated_data.get(
            'si_ff', interest.si_ff)
        interest.si_la = serializer.validated_data.get(
            'si_la', interest.si_la)
        interest.si_le = serializer.validated_data.get(
            'si_le', interest.si_le)
        interest.si_ns = serializer.validated_data.get(
            'si_ns', interest.si_ns)
        interest.si_np = serializer.validated_data.get(
            'si_np', interest.si_np)
        interest.si_rt = serializer.validated_data.get(
            'si_rt', interest.si_rt)
        interest.si_se = serializer.validated_data.get(
            'si_se', interest.si_se)
        interest.si_ha = serializer.validated_data.get(
            'si_ha', interest.si_ha)
        interest.si_tf = serializer.validated_data.get(
            'si_tf', interest.si_tf)
        interest.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
