from django.db import models

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title

#Account database model 
class Account(models.Model):
  a_Id = models.IntegerField(max_length=10, null=False,primary_key=True) 
  m_Id = models.IntegerField(max_length=10, null=False) 
  a_Account = models.CharField(max_length=20, null=False, unique=True)
  a_Password = models.CharField(max_length=20, null=False)
  a_Level = models.IntegerField(null=False )

  def __str__(self):
    return self.a_Account

#Spot database model
class Spot(models.Model):
  s_Id = models.IntegerField(max_length=10, null=False,primary_key=True) 
  s_Lang = models.CharField(max_length=10, null=False)
  s_Name = models.CharField(max_length=50, null=False, unique=True)
  s_Summary =  models.CharField(max_length=400, null=False)
  s_Introduction =  models.TextField(max_length=400, null=False)
  s_OpenTime = models.CharField(max_length=2000, null=False)
  s_District = models.CharField(max_length=50, null=False)
  s_Address = models.CharField(max_length=100, null=False)
  s_Tel = models.CharField(max_length=20, null=False)
  s_Fax = models.CharField(max_length=50, null=False)
  s_Latitude = models.FloatField(max_length=10, null=False)
  s_Longtitude = models.FloatField(max_length=10, null=False)
  s_Services =models.CharField(max_length=100, null=False)
  s_Category = models.CharField(max_length=100, null=False)
  s_UpdateTime =models.CharField(max_length=50, null=False)

  def __str__(self):
    return self.s_Name
  
#Member database model
class Member(models.Model):
  m_Id = models.IntegerField(max_length=10, null=False,primary_key=True) 
  m_Name = models.CharField(max_length=10, null=False, unique=True)
  m_Gender = models.CharField(max_length=2, null=False, default='m')
  m_Old = models.IntegerField(max_length=10, null=False)
  m_Email = models.EmailField(max_length=100,blank=True,default='')
  m_Phone = models.CharField(max_length=20, null=False)

  def __str__(self):
    return self.m_Name

#Travel_List database model
class TravelList(models.Model):
  t_Id = models.IntegerField(max_length=10, null=False,primary_key=True) 
  m_Id = models.IntegerField(max_length=10, null=False) 
  t_Name = models.CharField(max_length=10, null=False)
  #t_Time =
  #t_Privacy =
  #t_Views =
  #t_Likes =
  

  