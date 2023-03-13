from rest_framework import serializers
from .models import Task, Account, Spot, Member, s_Interest, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


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


class Travel_ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_List
        fields = '__all__'


class Travel_List_DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_List_Detail
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class s_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = s_Picture
        fields = '__all__'


class m_PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = m_Picture
        fields = '__all__'


class spotWithPictureURLSerializer(serializers.ModelSerializer):
    s_picture = s_PictureSerializer(many=True, source='s_picture_set')
    queryset = Spot.objects.prefetch_related('s_Id').all()

    class Meta:
        model = Spot
        fields = '__all__'

