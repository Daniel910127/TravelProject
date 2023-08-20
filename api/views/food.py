
from django.http import JsonResponse,HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from ..serializers import FoodSerializer,foodWithPictureURLSerializer

from ..models import Food
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
