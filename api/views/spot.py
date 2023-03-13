from django.shortcuts import render
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import TaskSerializer,AccountSerializer,SpotSerializer,MemberSerializer,s_InterestSerializer,FoodSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,m_PictureSerializer,spotWithPictureURLSerializer

from ..models import Task,Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture

# Create your views here.

@api_view(['GET'])
def spotList(request):
	spots = Spot.objects.all().order_by('-s_Id')
	serializer = SpotSerializer(spots, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def spotWithPictureList(request):
	queryset = Spot.objects.all()
	serializer = spotWithPictureURLSerializer(queryset, many=True)
	return Response(serializer.data)
