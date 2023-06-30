from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import Like_Record,Member,Spot,Food,Hotel,Travel_List
from ..serializers import Like_RecordSerializer

@api_view(['GET'])  # 某一會員的Like_record紀錄
def likeList(request, m_Id):
    permission_classes = (IsAuthenticated,) 
    likes = Like_Record.objects.filter(m_Id=m_Id).order_by('-r_Id')
    serializer = Like_RecordSerializer(likes, many=True)
    return Response(serializer.data)

class LikeSpotCreateView(APIView):#按讚景點新增
    def post(self, request, m_Id, s_Id):
        permission_classes = (IsAuthenticated,) 
        try:
            # 獲取 m_Id 和 s_Id
            m_Id = int(m_Id)
            s_Id = int(s_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            spot = Spot.objects.get(pk=s_Id)  # 使用相應的方法獲取 Spot 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(m_Id=member, s_Id=spot, r_LikeOrDisLike=1)
            like_record.save()

            # 序列化 Like_Record 對象
            serializer = Like_RecordSerializer(like_record)

            # 構造響應數據
            response_data = {
                "status": "201",
                "message": "使用者按讚成功",
                "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeSpotDeleteView(APIView):#按讚景點刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, m_Id, s_Id):
        try:
            # 獲取 m_Id 和 s_Id
            m_Id = int(m_Id)
            s_Id = int(s_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            spot = Spot.objects.get(pk=s_Id)  # 使用相應的方法獲取 Spot 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(m_Id=member, s_Id=spot, r_LikeOrDisLike=1).first()
            if like_record:
                like_record.delete()

                response_data = {
                    "status": "204",
                    "message": "使用者取消按讚成功"
                }
                return Response(response_data, status=status.HTTP_204_NO_CONTENT)
            else:
                response_data = {
                    "status": "404",
                    "message": "使用者按讚紀錄不存在"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeFoodCreateView(APIView):#按讚食物新增
    def post(self, request, m_Id, f_Id):
        permission_classes = (IsAuthenticated,) 
        try:
            # 獲取 m_Id 和 f_Id
            m_Id = int(m_Id)
            f_Id = int(f_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            food = Food.objects.get(pk=f_Id)  # 使用相應的方法獲取 Food 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(m_Id=member, f_Id=food, r_LikeOrDisLike=1)
            like_record.save()

            # 序列化 Like_Record 對象
            serializer = Like_RecordSerializer(like_record)

            # 構造響應數據
            response_data = {
                "status": "201",
                "message": "使用者按讚成功",
                "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeFoodDeleteView(APIView):#按讚食物刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, m_Id, f_Id):
        try:
            # 獲取 m_Id 和 f_Id
            m_Id = int(m_Id)
            f_Id = int(f_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            food = Food.objects.get(pk=f_Id)  # 使用相應的方法獲取 Food 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(m_Id=member, f_Id=food, r_LikeOrDisLike=1).first()
            if like_record:
                like_record.delete()

                response_data = {
                    "status": "204",
                    "message": "使用者取消按讚成功"
                }
                return Response(response_data, status=status.HTTP_204_NO_CONTENT)
            else:
                response_data = {
                    "status": "404",
                    "message": "使用者按讚紀錄不存在"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeHotelCreateView(APIView):#按讚住宿新增
    def post(self, request, m_Id, h_Id):
        permission_classes = (IsAuthenticated,) 
        try:
            # 獲取 m_Id 和 h_Id
            m_Id = int(m_Id)
            h_Id = int(h_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            hotel = Hotel.objects.get(pk=h_Id)  # 使用相應的方法獲取 Hotel 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(m_Id=member, h_Id=hotel, r_LikeOrDisLike=1)
            like_record.save()

            # 序列化 Like_Record 對象
            serializer = Like_RecordSerializer(like_record)

            # 構造響應數據
            response_data = {
                "status": "201",
                "message": "使用者按讚成功",
                "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeHotelDeleteView(APIView):#按讚住宿刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, m_Id, h_Id):
        try:
            # 獲取 m_Id 和 h_Id
            m_Id = int(m_Id)
            h_Id = int(h_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            hotel = Hotel.objects.get(pk=h_Id)  # 使用相應的方法獲取 Hotel 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(m_Id=member, h_Id=hotel, r_LikeOrDisLike=1).first()
            if like_record:
                like_record.delete()

                response_data = {
                    "status": "204",
                    "message": "使用者取消按讚成功"
                }
                return Response(response_data, status=status.HTTP_204_NO_CONTENT)
            else:
                response_data = {
                    "status": "404",
                    "message": "使用者按讚紀錄不存在"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeItineraryCreateView(APIView):#按讚行程表新增
    def post(self, request, m_Id, t_Id):
        permission_classes = (IsAuthenticated,) 
        try:
            # 獲取 m_Id 和 t_Id
            m_Id = int(m_Id)
            t_Id = int(t_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            itinerary = Travel_List.objects.get(pk=t_Id)  # 使用相應的方法獲取 TravelList 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(m_Id=member, t_Id=itinerary, r_LikeOrDisLike=1)
            like_record.save()

            # 序列化 Like_Record 對象
            serializer = Like_RecordSerializer(like_record)

            # 構造響應數據
            response_data = {
                "status": "201",
                "message": "使用者按讚成功",
                "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeItineraryDeleteView(APIView):#按讚行程表刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, m_Id, t_Id):
        try:
            # 獲取 m_Id 和 t_Id
            m_Id = int(m_Id)
            t_Id = int(t_Id)

            member = Member.objects.get(pk=m_Id)  # 使用相應的方法獲取 Member 對象
            itinerary = Travel_List.objects.get(pk=t_Id)  # 使用相應的方法獲取 TravelList 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(m_Id=member, t_Id=itinerary, r_LikeOrDisLike=1).first()
            if like_record:
                like_record.delete()

                response_data = {
                    "status": "204",
                    "message": "使用者取消按讚成功"
                }
                return Response(response_data, status=status.HTTP_204_NO_CONTENT)
            else:
                response_data = {
                    "status": "404",
                    "message": "使用者按讚紀錄不存在"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        except Member.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
