from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status


from ..serializers import  QuestionSerializer

from ..models import Question


class QuestionDetailView(generics.RetrieveAPIView):
    serializer_class = QuestionSerializer

    def get(self, request, s_Id):
        my_models = Question.objects.filter(s_Id=s_Id)
        if not my_models:
            response_data = {
                "success": False,
                "message": "問題資料回傳失敗",
                "error": "指定的s_Id不存在"
            }
        else:
            serializer = self.serializer_class(my_models, many=True)
            response_data = {
                "success": True,
                "message": "問題資料回傳成功",
                "data": serializer.data
            }

        return Response(response_data)
    
question_detail_view = QuestionDetailView.as_view()

