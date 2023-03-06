from rest_framework import serializers
from .models import Task,Account

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields ='__all__'

class AccountSerializer(serializers.ModelSerializer):
	class Meta:
		model = Account
		fields ='__all__'