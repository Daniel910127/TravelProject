from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404


from ..serializers import TaskSerializer, AccountSerializer, SpotSerializer, MemberSerializer, s_InterestSerializer, FoodSerializer, Travel_ListSerializer, Travel_List_DetailSerializer, QuestionSerializer, s_PictureSerializer, m_PictureSerializer, spotWithPictureURLSerializer

from ..models import Task, Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture

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


""" @api_view(['GET'])  
def spot_detail(request, s_Name):
    queryset = Spot.objects.filter(s_Name=s_Name).first()
    print(queryset)
    serializer = spotWithPictureURLSerializer(queryset, many=False)
    
    return Response(serializer.data) """
#http://127.0.0.1:8000/api/spot/七股鹽山/  output:七股鹽山的資料(包含image url)

class SpotDetailView(generics.RetrieveAPIView):
    serializer_class = spotWithPictureURLSerializer

    def get(self, request, s_Name):
        my_model = get_object_or_404(Spot, s_Name= s_Name)

        serializer = self.serializer_class(my_model)
        return Response(serializer.data)
    
spot_detail_view = SpotDetailView.as_view()