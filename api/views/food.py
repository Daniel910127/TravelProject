
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from ..serializers import AccountSerializer,SpotSerializer,MemberSerializer,s_InterestSerializer,FoodSerializer,Travel_ListSerializer,Travel_List_DetailSerializer,QuestionSerializer,s_PictureSerializer,m_PictureSerializer,foodWithPictureURLSerializer

from ..models import Account,Spot,Member,s_Interest,Food,Travel_List,Travel_List_Detail,Question,s_Picture,m_Picture

# Create your views here.

@api_view(['GET'])
def foodList(request):
	foods = Food.objects.all().order_by('-f_Id')
	serializer = FoodSerializer(foods, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def foodWithPictureList(request):
	queryset = Food.objects.all()
	serializer = foodWithPictureURLSerializer(queryset, many=True)
	return Response(serializer.data)

class FoodDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)   
    serializer_class = foodWithPictureURLSerializer

    def get(self, request, f_Id):
        try:
            my_model = Food.objects.get(f_Id=f_Id)
            serializer = self.serializer_class(my_model)

            response_data = {
                "success": True,
                "message": "食物資料回傳成功",
                "data": serializer.data
            }
        except Food.DoesNotExist:
            response_data = {
                "success": False,
                "message": "食物資料回傳失敗",
                "error": "指定的f_Id不存在"
            }

        return Response(response_data)
    
food_detail_view = FoodDetailView.as_view()
