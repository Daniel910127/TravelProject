from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from ..utils import ai
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F, ExpressionWrapper, FloatField




from ..serializers import  Travel_List_TotalSerializer,Travel_ListSerializer,Travel_List_DetailSerializer_o,Travel_List_StartTimeSerializer_o,foodWithPictureURLSerializer,hotelWithPictureURLSerializer

from ..models import Travel_List,Travel_List_Detail,Travel_List_StartTime,Account,Spot,Food,Hotel

# Create your views here.
class FoodRecommendationView(APIView):#推薦離該景點最近且最佳前五名食物
    def get(self, request, s_Id):
        try:
            # 獲取特定景點的資訊，包括經緯度、星級和評論
            spot = Spot.objects.get(pk=s_Id)

            s_latitude = spot.s_Latitude
            s_longitude = spot.s_Longitude

            # 查找最接近的食物建議，限制為 5 個結果
            recommended_food = Food.objects.annotate(
                distance=ExpressionWrapper(
                    (F('f_Latitude') - s_latitude) ** 2 + (F('f_Longitude') - s_longitude) ** 2,
                    output_field=FloatField()
                )
            ).order_by('distance', '-f_Stars', '-f_Reviews')[:5]

            if recommended_food:
                serializer = foodWithPictureURLSerializer(recommended_food, many=True)
                serialized_data = serializer.data

                response_data = {
                    "success": True,
                    "message": "食物建議成功",
                    "recommended_food": serialized_data
                }
                return JsonResponse(response_data, safe=False, json_dumps_params={'ensure_ascii': False})
            else:
                response_data = {
                    "success": True,
                    "message": "找不到食物建議",
                    "recommended_food": None
                }
                return JsonResponse(response_data)

        except Spot.DoesNotExist:
            response_data = {
                "success": False,
                "message": "景點不存在"
            }
            return JsonResponse(response_data, status=404)

class HotelRecommendationView(APIView):#推薦離該景點最近且最佳前五名住宿
    def get(self, request, s_Id):
        try:
            # 獲取特定景點的資訊，包括經緯度、星級和評論
            spot = Spot.objects.get(pk=s_Id)

            s_latitude = spot.s_Latitude
            s_longitude = spot.s_Longitude

            # 查找最接近的食物建議，限制為 5 個結果
            recommended_hotel = Hotel.objects.annotate(
                distance=ExpressionWrapper(
                    (F('h_Latitude') - s_latitude) ** 2 + (F('h_Longitude') - s_longitude) ** 2,
                    output_field=FloatField()
                )
            ).order_by('distance', '-h_Stars', '-h_Reviews')[:5]

            if recommended_hotel:
                serializer = hotelWithPictureURLSerializer(recommended_hotel, many=True)
                serialized_data = serializer.data

                response_data = {
                    "success": True,
                    "message": "住宿建議成功",
                    "recommended_hotel": serialized_data
                }
                return JsonResponse(response_data, safe=False, json_dumps_params={'ensure_ascii': False})
            else:
                response_data = {
                    "success": True,
                    "message": "找不到食物建議",
                    "recommended_hotel": None
                }
                return JsonResponse(response_data)

        except Spot.DoesNotExist:
            response_data = {
                "success": False,
                "message": "景點不存在"
            }
            return JsonResponse(response_data, status=404)


@api_view(['GET'])##全部的行程表
def travel_List_Total(request):
    permission_classes = (IsAuthenticated,)
    travel_lists = Travel_List.objects.filter(travel_list_detail__s_Id__isnull=False).distinct()
    serializer = Travel_List_TotalSerializer(travel_lists, many=True)
    return Response(serializer.data)


@api_view(['POST'])  # 創建主行程表
def CreateTravelList(request):
    permission_classes = (IsAuthenticated,)
   
    account_id = request.user.id 
    
    try:
        account = Account.objects.get(id=account_id)
    except Account.DoesNotExist:
        response_data = {
            "status": "401",
            "message": "行程表創建失敗",
            "error": "指定的id不存在"
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
    
    t_Name = request.data.get('t_Name')
    t_Description = request.data.get('t_Description')
    t_StartDate = request.data.get('t_StartDate')
    t_StayDay = request.data.get('t_StayDay')
    t_Privacy = request.data.get('t_Privacy')
    t_Views = 0
    t_Likes = 0
    t_score = 0
    # 獲取request.data中的數據
    custom = request.data.get('custom')
    if custom:
        interest_data = request.data.get('interest')
        # 調用ai.py中的函数進行處理
        ai.process_interest_data(interest_data)
    else:
        ai.custom = False
        
    playzone_data = request.data.get('playZone')
    ai.process_playzone_data(playzone_data)
    # 獲取當前時間
    current_time = datetime.now()
    # 格式化為所需的日期時間字符串
    t_FormTime = current_time.strftime('%Y-%m-%d %H:%M:%S.%f')
    # 將 t_StartDate 轉換為日期對象
    start_date = datetime.strptime(t_StartDate, '%Y-%m-%d')
    # 計算 t_EndDate
    end_date = start_date + timedelta(days=int(t_StayDay))
    # 將 t_EndDate 格式化為字符串
    t_EndDate = end_date.strftime('%Y-%m-%d')

    travellist = Travel_List.objects.create(
        account=account, t_Name=t_Name, t_Description=t_Description, 
        t_FormTime=t_FormTime, t_StartDate=t_StartDate, t_EndDate=t_EndDate,
        t_StayDay=t_StayDay, t_Privacy=t_Privacy, t_Views=t_Views, t_Likes=t_Likes,
        t_score=t_score
    )

    if travellist:
        # 在這裡獲取t_Id
        t_Id = travellist.t_Id
        response_data = {
            "status": "201",
            "message": "行程表創建成功",
            "data": {
                "id": account_id,
                "t_Name": t_Name,
                "t_Description": t_Description,
                "t_StartDate": t_StartDate,
                "t_StayDay": t_StayDay,
                "t_Privacy": t_Privacy,
                "t_Views": t_Views,
                "t_Likes": t_Likes,
                "t_score": t_score
            }
        }
        ai.get_t_Id(t_Id)
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        response_data = {
            "status": "401",
            "message": "行程表創建失敗"
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])##行程表細項創立
def CreateTravelListDetail(request,t_Id):
    permission_classes = (IsAuthenticated,)
    serializer = Travel_List_DetailSerializer_o(data=request.data)
    if serializer.is_valid():
        tl_TransportMode = serializer.validated_data.get('tl_TransportMode')
        tl_TransportTime = serializer.validated_data.get('tl_TransportTime')
        tl_StayTime = serializer.validated_data.get('tl_StayTime')
        tl_Day = serializer.validated_data.get('tl_Day')
        tl_Order = serializer.validated_data.get('tl_Order')
        tl_Notes = serializer.validated_data.get('tl_Notes')
        tl_score = 0
        t_Id = Travel_List.objects.get(pk=t_Id)
        s_Id = serializer.validated_data.get('s_Id')
        f_Id = serializer.validated_data.get('f_Id')
        h_Id = serializer.validated_data.get('h_Id')

        travellist = Travel_List_Detail.objects.create(
            tl_TransportMode=tl_TransportMode, tl_TransportTime=tl_TransportTime, 
            tl_StayTime=tl_StayTime, tl_Day=tl_Day, tl_Order=tl_Order,
            tl_Notes=tl_Notes, tl_score=tl_score, f_Id=f_Id, h_Id= h_Id,
            s_Id=s_Id, t_Id=t_Id
            )
        response_data = {
            "status": "201",
            "message": "行程創建成功",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        response_data = {
            "status": "401",
            "message": "行程創建失敗",
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])##行程表開始時間創立
def CreateTravelListStartTime(request,t_Id):
    permission_classes = (IsAuthenticated,)
    serializer = Travel_List_StartTimeSerializer_o(data=request.data)
    if serializer.is_valid():
        t_Id = Travel_List.objects.get(pk=t_Id)
        tls_Day = serializer.validated_data.get('tls_Day')
        tls_StartTime = serializer.validated_data.get('tls_StartTime')
        
        travellist = Travel_List_StartTime.objects.create(
            t_Id=t_Id,tls_Day=tls_Day,tls_StartTime=tls_StartTime
            )
        response_data = {
            "status": "201",
            "message": "行程表開始時間創建成功",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        response_data = {
            "status": "401",
            "message": "行程表開始時間創建失敗",
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

    
@api_view(['PUT'])  ## 主行程更改
def UpdateTravelList(request, t_Id):
    permission_classes = (IsAuthenticated,)
    serializer = Travel_ListSerializer(data=request.data)
    if serializer.is_valid():
        id = serializer.validated_data.get('id')
        t_Name = serializer.validated_data.get('t_Name')
        t_Description = serializer.validated_data.get('t_Description')
        t_StartDate = serializer.validated_data.get('t_StartDate')
        t_StayDay = serializer.validated_data.get('t_StayDay')
        t_EndDate = serializer.validated_data.get('t_EndDate')
        t_Privacy = serializer.validated_data.get('t_Privacy')
        t_Views = serializer.validated_data.get('t_Views')
        t_Likes = serializer.validated_data.get('t_Likes')
        t_score = serializer.validated_data.get('t_score')

        try:
            # 使用 get() 获取符合条件的记录
            travellist = Travel_List.objects.get(pk=t_Id)

            # 更新记录
            travellist.id = id
            travellist.t_Name = t_Name
            travellist.t_Description = t_Description
            travellist.t_StartDate = t_StartDate
            travellist.t_EndDate = t_EndDate
            travellist.t_StayDay = t_StayDay
            travellist.t_Privacy = t_Privacy
            travellist.t_Views = t_Views
            travellist.t_Likes = t_Likes
            travellist.t_score = t_score
            travellist.save()  # 保存更新后的记录

            response_data = {
                "status": "201",
                "message": "主行程表更新成功",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Travel_List.DoesNotExist:
            response_data = {
                "status": "404",
                "message": "主行程表不存在",
                "errors": "指定的t_Id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
    else:
        response_data = {
            "status": "401",
            "message": "主行程表更新失败",
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

    
@api_view(['PUT'])##行程細節更改
def UpdateTravelListDetail(request,t_Id,tl_Id):
    permission_classes = (IsAuthenticated,)
    serializer = Travel_List_DetailSerializer_o(data=request.data)
    if serializer.is_valid(): 
        tl_TransportMode = serializer.validated_data.get('tl_TransportMode')
        tl_TransportTime = serializer.validated_data.get('tl_TransportTime')
        tl_StayTime = serializer.validated_data.get('tl_StayTime')
        tl_Day = serializer.validated_data.get('tl_Day')
        tl_Order = serializer.validated_data.get('tl_Order')
        tl_Notes = serializer.validated_data.get('tl_Notes')
        tl_score = serializer.validated_data.get('tl_score')
        t_Id = serializer.validated_data.get('t_Id')
        s_Id = serializer.validated_data.get('s_Id')
        f_Id = serializer.validated_data.get('f_Id')
        h_Id = serializer.validated_data.get('h_Id')

        try:
            # 使用 get() 獲取符合條件的記錄
            travellist = Travel_List_Detail.objects.get(tl_Id=tl_Id, t_Id=t_Id)

            
            # 更新記錄
            travellist.t_Id = t_Id
            travellist.tl_TransportMode = tl_TransportMode
            travellist.tl_TransportTime = tl_TransportTime
            travellist.tl_StayTime =tl_StayTime
            travellist.tl_Day=tl_Day
            travellist.tl_Order=tl_Order
            travellist.tl_Notes=tl_Notes
            travellist.tl_score=tl_score
            travellist.s_Id = s_Id
            travellist.f_Id = f_Id
            travellist.h_Id = h_Id
            travellist.save()  # 儲存更新後的記錄

            response_data = {
                "status": "204",
                "message": "行程細節更新成功",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_204_NO_CONTENT)
        except Travel_List_Detail.DoesNotExist:
            response_data = {
                "status": "404",
                "message": "行程細節不存在",
                "errors": "指定的tl_Id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
    else:
        response_data = {
            "status": "401",
            "message": "行程細節更新失敗",
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['PUT'])##行程表開始時間更改
def UpdateTravelListStartTime(request,t_Id,tls_Id):
    permission_classes = (IsAuthenticated,)
    serializer = Travel_List_StartTimeSerializer_o(data=request.data)
    if serializer.is_valid():
        t_Id = serializer.validated_data.get('t_Id')
        tls_Day = serializer.validated_data.get('tls_Day')
        tls_StartTime = serializer.validated_data.get('tls_StartTime')

        try:
            # 使用 get() 獲取符合條件的記錄
            travellist = Travel_List_StartTime.objects.get(tls_Id=tls_Id)
            
            # 更新記錄
            travellist.t_Id = t_Id
            travellist.tls_Day = tls_Day
            travellist.tls_StartTime = tls_StartTime
            travellist.save()  # 儲存更新後的記錄

            response_data = {
                "status": "204",
                "message": "行程表開始時間更新成功",
                "data": serializer.data
            }
            return Response(response_data, status=status.HTTP_204_NO_CONTENT)
        except Travel_List_StartTime.DoesNotExist:
            response_data = {
                "status": "404",
                "message": "行程表開始時間不存在",
                "errors": "指定的tls_Id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
    else:
        response_data = {
            "status": "401",
            "message": "行程表開始時間更新失敗",
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

class DeleteTravelList(APIView): # 主行程刪除
    permission_classes = (IsAuthenticated,)

    def delete(self, request, t_Id): # 注意這裡的參數名稱是 t_Id
        try:
            # 獲取 id 和 s_Id
            t_Id = int(t_Id) # 使用 t_Id 而不是 t_id

            travellist = Travel_List.objects.get(pk=t_Id)

            # 刪除 Travel_List 對象
            if travellist:
                travellist.delete()

                response_data = {
                    "status": "204",
                    "message": "主行程刪除成功"
                }
                return Response(response_data, status=status.HTTP_204_NO_CONTENT)
            else:
                response_data = {
                    "status": "404",
                    "message": "主行程刪除失敗"
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        except Travel_List.DoesNotExist:
            response_data = {
                "status": "404",
                "message": "主行程不存在",
                "errors": "指定的t_Id不存在"
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)



class DeleteTravelListDetail(APIView):##行程細節刪除
    permission_classes = (IsAuthenticated,)
    def delete(self,request,tl_Id,t_Id): 
        try:
            # 使用 get() 獲取符合條件的記錄
            travellist = Travel_List_Detail.objects.get(tl_Id=tl_Id,t_Id=t_Id)
                
            # 執行刪除操作
            travellist.delete()

            response_data = {
                "status": "204",
                "message": "行程細節刪除成功",
            }
            return Response(response_data, status=status.HTTP_204_NO_CONTENT)
        except Travel_List_Detail.DoesNotExist:
            response_data = {
                "status": "204",
                "message": "行程細節不存在",
                "errors": "指定的tl_Id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)



class DeleteTravelListStartTime(APIView):
    permission_classes = (IsAuthenticated,)
    
    def delete(self, request, tls_Id, t_Id):
        try:
            # 使用 get() 獲取符合條件的記錄
            travellist = Travel_List_StartTime.objects.get(tls_Id=tls_Id)
            
            # 刪除記錄
            travellist.delete()

            response_data = {
                "status": "204",
                "message": "行程表開始時間刪除成功"
            }
            return Response(response_data, status=status.HTTP_204_NO_CONTENT)
        except Travel_List_StartTime.DoesNotExist:
            response_data = {
                "status": "404",
                "message": "行程表開始時間不存在",
                "errors": "指定的tls_Id不存在"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

class TravelListView(generics.ListAPIView):  # 更改繼承類別為ListAPIView
    permission_classes = (IsAuthenticated,)
    serializer_class = Travel_List_TotalSerializer

    def get_queryset(self):
        account_id = self.kwargs['id']  # Get the account ID from the URL kwargs
        queryset = Travel_List.objects.filter(account_id=account_id)
        return queryset

    def list(self, request, *args, **kwargs):  # 更改方法名稱為list
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        response_data = {
            "status": "200",
            "message": "行程表資料獲取成功",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

travel_List_detail_view = TravelListView.as_view()
