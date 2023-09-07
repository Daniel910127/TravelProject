from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import  Account, Spot, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture,f_Picture, a_Picture,Hotel,h_Picture,Like_Record,Travel_List_StartTime

class AccountSerializer(serializers.Serializer):
    account = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=128)
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    rank = serializers.IntegerField(default=0, required=False)

    def create(self, validated_data):
        account = validated_data['account']
        password = validated_data['password']
        username = validated_data['username']
        email = validated_data['email']
        rank = validated_data.get('rank', 0)

        # 使用AccountManager的create_user方法创建账户
        account = Account.objects.create_user(account=account, password=password, rank=rank, email=email, username=username)
        return account
   

    def update(self, instance, validated_data):
        instance.account = validated_data.get('account', instance.account)
        password = validated_data.get('password')
        if password:
            instance.password = make_password(password)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.rank = validated_data.get('rank', instance.rank)
        instance.save()
        return instance

class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
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


class a_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = a_Picture
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
class Like_Record_Detail_Serializer(serializers.ModelSerializer):

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
    account = serializers.SerializerMethodField()  # 新增字段

    def get_startTime(self, obj):
        start_times = {}
        for start_time in obj.travel_list_starttime_set.all():
            start_times[str(start_time.tls_Day)] = start_time.tls_StartTime
        return start_times

    def get_account(self, obj):
        account = Account.objects.get(id=obj.account.id)  # 根據 Travel_List 的 id 獲取相應的 Member
        return AccountSerializer(account).data  # 序列化 Member 數據

    travel_list_detail = Travel_List_DetailSerializer(many=True, source='travel_list_detail_set')

    class Meta:
        model = Travel_List
        fields = '__all__'
