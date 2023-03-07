from rest_framework import serializers
from .models import Task,Account,Spot,Member

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields ='__all__'

class AccountSerializer(serializers.ModelSerializer):
	class Meta:
		model = Account
		fields ='__all__'

class SpotSerializer(serializers.ModelSerializer):
	class Meta:
		model = Spot
		fields ='__all__'

class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields ='__all__'