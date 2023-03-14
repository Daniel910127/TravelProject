
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import TaskSerializer,AccountSerializer,SpotSerializer,MemberSerializer,s_InterestSerializer,FoodSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,m_PictureSerializer,foodWithPictureURLSerializer

from ..models import Task,Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture

# Create your views here.

@api_view(['GET'])
def foodList(request):
	foods = Food.objects.all().order_by('-s_Id')
	serializer = FoodSerializer(foods, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def foodWithPictureList(request):
	queryset = Food.objects.all()
	serializer = foodWithPictureURLSerializer(queryset, many=True)
	return Response(serializer.data)
