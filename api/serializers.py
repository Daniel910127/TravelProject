from rest_framework import serializers
from .models import  Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture,f_Picture, m_Picture,Hotel,h_Picture,Like_Record,Travel_List_StartTime

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = '__all__'


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class s_InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = s_Interest
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
class s_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = s_Picture
        fields = '__all__'

class f_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = f_Picture
        fields = '__all__'


class m_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = m_Picture
        fields = '__all__'

class h_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = h_Picture
        fields = '__all__'

class spotWithPictureURLSerializer(serializers.ModelSerializer):
    s_picture = s_PictureSerializer(many=True, source='s_picture_set')
    queryset = Spot.objects.prefetch_related('s_Id').all()

    class Meta:
        model = Spot
        fields = '__all__'

class foodWithPictureURLSerializer(serializers.ModelSerializer):
    f_picture = f_PictureSerializer(many=True, source='f_picture_set')
    queryset = Food.objects.prefetch_related('f_Id').all()

    class Meta:
        model = Food
        fields = '__all__'

class hotelWithPictureURLSerializer(serializers.ModelSerializer):
    h_picture = h_PictureSerializer(many=True, source='h_picture_set')
    queryset = Hotel.objects.prefetch_related('h_Id').all()

    class Meta:
        model = Hotel
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    s_Id = spotWithPictureURLSerializer()
    class Meta:
        model = Question
        fields = '__all__'
class Like_RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like_Record
        fields = '__all__'
class Travel_List_StartTimeSerializer_o(serializers.ModelSerializer):
    class Meta:
        model = Travel_List_StartTime
        fields = '__all__'
class Travel_List_StartTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_List_StartTime
        fields = ('tls_Day', 'tls_StartTime')
class Travel_ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_List
        fields = '__all__'
class Travel_ListSerializer_d(serializers.ModelSerializer):
    class Meta:
        model = Travel_List
        fields = ['t_Id']
class Travel_List_DetailSerializer_o(serializers.ModelSerializer):
    class Meta:
        model = Travel_List_Detail
        fields = '__all__'
class Travel_List_DetailSerializer(serializers.ModelSerializer):
    other_info = serializers.SerializerMethodField()             #forkey to spot/food/hotel

    def get_other_info(self, obj):
        spot = obj.s_Id
        food = obj.f_Id
        hotel = obj.h_Id
        if spot is not None:
            return spotWithPictureURLSerializer(spot).data
        if food is not None:
            return foodWithPictureURLSerializer(food).data
        if hotel is not None:
            return hotelWithPictureURLSerializer(hotel).data
        return None
    class Meta:
        model = Travel_List_Detail
        fields = '__all__'
        
class Travel_List_TotalSerializer(serializers.ModelSerializer):
    startTime = serializers.SerializerMethodField()
    member = serializers.SerializerMethodField()  # 新增字段

    def get_startTime(self, obj):
        start_times = {}
        for start_time in obj.travel_list_starttime_set.all():
            start_times[str(start_time.tls_Day)] = start_time.tls_StartTime
        return start_times

    def get_member(self, obj):
        member = Member.objects.get(m_Id=obj.m_Id)  # 根據 Travel_List 的 m_Id 獲取相應的 Member
        return MemberSerializer(member).data  # 序列化 Member 數據

    travel_list_detail = Travel_List_DetailSerializer(many=True, source='travel_list_detail_set')

    class Meta:
        model = Travel_List
        fields = '__all__'



