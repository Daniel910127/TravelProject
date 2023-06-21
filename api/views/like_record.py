from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from ..models import Like_Record
from ..serializers import Like_RecordSerializer

class LikeRecordAPIView(APIView):
    def post(self, request):
        serializer = Like_RecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "success": True,
                "message": "like association was created",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


