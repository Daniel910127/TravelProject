from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import Like_Record,Account,Spot,Food,Hotel,Travel_List
from ..serializers import Like_RecordSerializer,Like_Record_Detail_Serializer,SpotSerializer
from ..serializers import hotelWithPictureURLSerializer,foodWithPictureURLSerializer,spotWithPictureURLSerializer

class AccountSpotLikeView(APIView):#景點加上該帳號是否按讚
    def get(self, request, account_id):
        try:
            queryset = Spot.objects.all()
            serializer = spotWithPictureURLSerializer(queryset, many=True)
            spots = serializer.data  # 獲取所有景點
            
            liked_spots = []  # 用於存儲帳號按讚的景點
            for spot in spots:
                like_record = Like_Record.objects.filter(id=account_id, s_Id=spot['s_Id']).exists()
                liked_spots.append({
                    "s_Id": spot['s_Id'],
                    "s_Name": spot['s_Name'],
                    "s_Summary": spot['s_Summary'],
                    "s_Introduction": spot['s_Introduction'],
                    "s_OpenTime": spot['s_OpenTime'],
                    "s_District": spot['s_District'],
                    "s_Address": spot['s_Address'],
                    "s_Tel": spot['s_Tel'],
                    "s_Fax": spot['s_Fax'],
                    "s_Latitude": spot['s_Latitude'],
                    "s_Longitude": spot['s_Longitude'],
                    "s_Services": spot['s_Services'],
                    "s_Category": spot['s_Category'],
                    "s_UpdateTime": spot['s_UpdateTime'],
                    "s_Stars": spot['s_Stars'],
                    "s_Reviews": spot['s_Reviews'],
                    "s_Likes": spot['s_Likes'],
                    "s_picture":spot['s_picture'],
                    "like_or_dislike": like_record,
                    # "s_picture":spot.s_picture
                })
            
            response_data = {
                "success": True,
                "message": "景點按讚資料回傳成功",
                "data": liked_spots
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Spot.DoesNotExist:
            response_data = {
                "success": False,
                "message": "景點不存在",
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

class AccountFoodLikeView(APIView):#食物加上該帳號是否按讚
    def get(self, request, account_id):
        try:

            queryset = Food.objects.all()
            serializer = foodWithPictureURLSerializer(queryset, many=True)
            foods = serializer.data  # 獲取所有景點
            liked_foods = []  # 用於存儲帳號按讚的景點
          
            for food in foods:
                like_record = Like_Record.objects.filter(id=account_id, f_Id=food['f_Id']).exists()
                liked_foods.append({
                    "f_Id": food['f_Id'],
                    "f_Name": food['f_Name'],
                    "f_Summary": food['f_Summary'],
                    "f_Introduction": food['f_Introduction'],
                    "f_OpenTime": food['f_OpenTime'],
                    "f_District": food['f_District'],
                    "f_Address": food['f_Address'],
                    "f_Tel": food['f_Tel'],
                    "f_Fax": food['f_Fax'],
                    "f_Latitude": food['f_Latitude'],
                    "f_Longitude": food['f_Longitude'],
                    "f_Services": food['f_Services'],
                    "f_Category": food['f_Category'],
                    "f_UpdateTime": food['f_UpdateTime'],
                    "f_Stars": food['f_Stars'],
                    "f_Reviews": food['f_Reviews'],
                    "f_Likes": food['f_Likes'],
                    "f_picture":food['f_picture'],
                    "like_or_dislike": like_record,
                    # "f_picture":food['f_picture
                })
            
            response_data = {
                "success": True,
                "message": "食物按讚資料回傳成功",
                "data": liked_foods
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Food.DoesNotExist:
            response_data = {
                "success": False,
                "message": "食物不存在",
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)


class AccountHotelLikeView(APIView):#飯店加上該帳號是否按讚
    def get(self, request, account_id):
        try:
            queryset = Hotel.objects.all()
            serializer = hotelWithPictureURLSerializer(queryset, many=True)
            hotels = serializer.data  # 獲取所有景點
            liked_hotels = []  # 用於存儲帳號按讚的景點
            for hotel in hotels:
                like_record = Like_Record.objects.filter(id=account_id, h_Id=hotel['h_Id']).exists()
                liked_hotels.append({
                    "h_Id": hotel['h_Id'],
                    "h_Name": hotel['h_Name'],
                    "h_Summary": hotel['h_Summary'],
                    "h_Introduction": hotel['h_Introduction'],
                    "h_OpenTime": hotel['h_OpenTime'],
                    "h_District": hotel['h_District'],
                    "h_Address": hotel['h_Address'],
                    "h_Tel": hotel['h_Tel'],
                    "h_Fax": hotel['h_Fax'],
                    "h_Latitude": hotel['h_Latitude'],
                    "h_Longitude": hotel['h_Longitude'],
                    "h_Services": hotel['h_Services'],
                    "h_Category": hotel['h_Category'],
                    "h_UpdateTime": hotel['h_UpdateTime'],
                    "h_Stars": hotel['h_Stars'],
                    "h_Reviews": hotel['h_Reviews'],
                    "h_Likes": hotel['h_Likes'],
                    "like_or_dislike": like_record,
                    "h_picture":hotel['h_picture']
                })
            
            response_data = {
                "success": True,
                "message": "住宿按讚資料回傳成功",
                "data": liked_hotels
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except Hotel.DoesNotExist:
            response_data = {
                "success": False,
                "message": "住宿不存在",
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])  # 某一會員的Like_record紀錄
def likeList(request, account_id):
    permission_classes = (IsAuthenticated,) 
    likes = Like_Record.objects.filter(id=account_id).order_by('-r_Id')
    serializer = Like_Record_Detail_Serializer(likes, many=True)
    response_data = {
            "status": "200",
            "message": "按讚資料獲取成功",
            "data": serializer.data
        }
    return Response(response_data, status=status.HTTP_200_OK)

class LikeSpotCreateView(APIView):#按讚景點新增
    permission_classes = (IsAuthenticated,) 
    def post(self, request, account_id, s_Id):
        try:
            # 獲取 id 和 s_Id
            id = int(account_id)
            s_Id = int(s_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            spot = Spot.objects.get(pk=s_Id)  # 使用相應的方法獲取 Spot 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(id=account, s_Id=spot)
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
        
        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeSpotDeleteView(APIView):#按讚景點刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, account_id, s_Id):
        try:
            # 獲取 id 和 s_Id
            id = int(account_id)
            s_Id = int(s_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            spot = Spot.objects.get(pk=s_Id)  # 使用相應的方法獲取 Spot 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(id=account, s_Id=spot).first()
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

        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeFoodCreateView(APIView):#按讚食物新增
    permission_classes = (IsAuthenticated,) 
    def post(self, request, account_id, f_Id):    
        try:
            # 獲取 id 和 f_Id
            id = int(account_id)
            f_Id = int(f_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            food = Food.objects.get(pk=f_Id)  # 使用相應的方法獲取 Food 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(id=account, f_Id=food)
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
        
        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeFoodDeleteView(APIView):#按讚食物刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, account_id, f_Id):
        try:
            # 獲取 id 和 f_Id
            id = int(account_id)
            f_Id = int(f_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            food = Food.objects.get(pk=f_Id)  # 使用相應的方法獲取 Food 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(id=account, f_Id=food).first()
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

        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeHotelCreateView(APIView):#按讚住宿新增
    permission_classes = (IsAuthenticated,) 
    def post(self, request, account_id, h_Id):  
        try:
            # 獲取 id 和 h_Id
            id = int(account_id)
            h_Id = int(h_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            hotel = Hotel.objects.get(pk=h_Id)  # 使用相應的方法獲取 Hotel 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(id=account, h_Id=hotel)
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
        
        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeHotelDeleteView(APIView):#按讚住宿刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, account_id, h_Id):
        try:
            # 獲取 id 和 h_Id
            id = int(account_id)
            h_Id = int(h_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            hotel = Hotel.objects.get(pk=h_Id)  # 使用相應的方法獲取 Hotel 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(id=account, h_Id=hotel).first()
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

        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class LikeItineraryCreateView(APIView):#按讚行程表新增
    permission_classes = (IsAuthenticated,) 
    def post(self, request, account_id, s_Id):   
        try:
            # 獲取 id 和 t_Id
            id = int(account_id)
            t_Id = int(t_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            itinerary = Travel_List.objects.get(pk=t_Id)  # 使用相應的方法獲取 TravelList 對象


            # 創建 Like_Record 對象
            like_record = Like_Record.objects.create(id=account, t_Id=itinerary)
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
        
        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class LikeItineraryDeleteView(APIView):#按讚行程表刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, account_id, t_Id):
        try:
            # 獲取 id 和 t_Id
            id = int(account_id)
            t_Id = int(t_Id)

            account = Account.objects.get(pk=id)  # 使用相應的方法獲取 Member 對象
            itinerary = Travel_List.objects.get(pk=t_Id)  # 使用相應的方法獲取 TravelList 對象

            # 刪除 Like_Record 對象
            like_record = Like_Record.objects.filter(id=account, t_Id=itinerary).first()
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

        except Account.DoesNotExist:
            response_data = {
                "status": "401",
                "message": "使用者取消按讚失敗"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
