from django.db import models

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title

#Account database model 
class Account(models.Model):
  a_Id = models.AutoField( primary_key=True) 
  m_Id = models.IntegerField( null=False) 
  a_Account = models.CharField(max_length=20, null=False, unique=True)
  a_Password = models.CharField(max_length=20, null=False)
  a_Level = models.IntegerField(null=False )

  def __str__(self):
    return self.a_Account

#Spot database model
class Spot(models.Model):
  s_Id = models.AutoField( primary_key=True) 
  s_Lang = models.CharField(max_length=10, null=False)
  s_Name = models.CharField(max_length=50, null=False)
  s_Summary =  models.CharField(max_length=2000, null=False)
  s_Introduction =  models.TextField(max_length=2000, null=False)
  s_OpenTime = models.CharField(max_length=2000, null=False)
  s_District = models.CharField(max_length=50, null=False)
  s_Address = models.CharField(max_length=100, null=False)
  s_Tel = models.CharField(max_length=50, null=False)
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
  m_Id = models.AutoField( primary_key=True) 
  m_Name = models.CharField(max_length=10, null=False, unique=True)
  m_Gender = models.CharField(max_length=2, null=False, default='m')
  m_Old = models.IntegerField( null=False)
  m_Email = models.EmailField(max_length=100,blank=True,default='')
  m_Phone = models.CharField(max_length=20, null=False)

  def __str__(self):
    return self.m_Name

#Travel_List database model
class Travel_List(models.Model):
  t_Id = models.AutoField( primary_key=True) 
  m_Id = models.IntegerField(null=False) 
  t_Name = models.CharField(max_length=10, null=False)
  t_FormTime = models.DateTimeField(auto_now=True)
  t_Privacy = models.CharField(max_length=2, null=False, default='n') 
  t_Views =  models.IntegerField(null=False) 
  t_Likes =  models.IntegerField(null=False) 
  t_StarLocation = models.CharField(max_length=50, null=False) 

  def __str__(self):
    return self.t_Name
  
#Travel_List_detail database model
class Travel_List_Detail(models.Model):
  tl_Id = models.AutoField( primary_key=True) 
  t_Id =  models.IntegerField(null=False) 
  s_Id =  models.IntegerField(null=False) 
  f_Id =  models.IntegerField(null=False) 
  tl_Transport = models.CharField(max_length=20, null=False)
  tl_StayTime =  models.CharField(max_length=10, null=False,default='2:00')
  tl_Order = models.IntegerField(null=False)
  tl_Notes = models.CharField(max_length=200, null=False)
  
  def __str__(self):
    return self.tl_Notes
  
#Food database model
class Food(models.Model):
  f_Id = models.AutoField( primary_key=True) 
  f_Lang = models.CharField(max_length=10, null=False)
  f_Name = models.CharField(max_length=50, null=False)
  f_Summary =  models.CharField(max_length=400, null=False)
  f_Introduction =  models.TextField(max_length=400, null=False)
  f_OpenTime = models.CharField(max_length=2000, null=False)
  f_District = models.CharField(max_length=50, null=False)
  f_Address = models.CharField(max_length=100, null=False)
  f_Tel = models.CharField(max_length=20, null=False)
  f_Fax = models.CharField(max_length=50, null=False)
  f_Latitude = models.FloatField(max_length=10, null=False)
  f_Longtitude = models.FloatField(max_length=10, null=False)
  f_Services =models.CharField(max_length=100, null=False)
  f_Category = models.CharField(max_length=100, null=False)
  f_Consume = models.CharField(max_length=20, null=False)
  f_UpdateTime =models.CharField(max_length=50, null=False)

  def __str__(self):
    return self.f_Name

#s_Picture database model
class  s_Picture(models.Model):
  sp_Id = models.AutoField( primary_key=True) 
  s_Id = models.ForeignKey(to="Spot", on_delete=models.CASCADE) 
  sp_URL = models.ImageField(upload_to='images/spot/', default=None)

  def __str__(self):
    return self.sp_URL

#f_Picture database model
class  f_Picture(models.Model):
  fp_Id = models.AutoField( primary_key=True) 
  f_Id = models.ForeignKey(to="Food", on_delete=models.CASCADE) 
  fp_URL = models.ImageField(upload_to='images/food /', default=None)

  def __str__(self):
    return self.fp_URL

#m_Picture database model
class  m_Picture(models.Model):
  mp_Id = models.AutoField( primary_key=True) 
  m_Id = models.IntegerField( null=False) 
  mp_URL = models.ImageField(upload_to='images/member/', default=None)

  def __str__(self):
    return self.mp_URL

#h_Picture database model
class  h_Picture(models.Model):
  hp_Id = models.AutoField( primary_key=True) 
  h_Id = models.IntegerField( null=False) 
  hp_URL = models.ImageField(upload_to='images/hotel/', default=None)

  def __str__(self):
    return self.hp_URL
  
#Question database model
class Question(models.Model):
  q_Id = models.AutoField( primary_key=True) 
  s_Id = models.IntegerField( null=False) 
  q_question =models.CharField(max_length=100, null=False)
  q_answer = models.CharField(max_length=100, null=False)

  def __str__(self):
    return self.q_question
  

#Hotel database model
class Hotel(models.Model):
  h_Id = models.AutoField( primary_key=True)  
  h_Name = models.CharField(max_length=50, null=False)
  h_Summary =  models.CharField(max_length=400, null=True)
  h_Introduction =  models.TextField(max_length=400, null=True)
  h_OpenTime = models.CharField(max_length=2000, null=True)
  h_District = models.CharField(max_length=50, null=True)
  h_Address = models.CharField(max_length=100, null=False)
  h_Tel = models.CharField(max_length=20, null=True)
  h_Fax = models.CharField(max_length=50, null=True)
  h_Latitude = models.FloatField(max_length=10, null=False)
  h_Longtitude = models.FloatField(max_length=10, null=False)
  h_Services =models.CharField(max_length=100, null=True)
  h_Category = models.CharField(max_length=100, null=False)
  h_UpdateTime =models.CharField(max_length=50, null=False)

  def __str__(self):
    return self.h_Name
  

#s_Interest database model
class s_Interest(models.Model):
  si_Id = models.AutoField( primary_key=True) 
  m_Id = models.IntegerField( null=False) 
  si_pg = models.IntegerField( null=False) #????????????
  si_os = models.IntegerField( null=False) #????????????
  si_tp = models.IntegerField( null=False) #????????????????????????
  si_ee = models.IntegerField( null=False) #????????????
  si_ff = models.IntegerField( null=False) #????????????
  si_la = models.IntegerField( null=False) #????????????
  si_le = models.IntegerField( null=False) #????????????
  si_ns = models.IntegerField( null=False) #????????????
  si_np = models.IntegerField( null=False) #???????????????????????????
  si_rt = models.IntegerField( null=False) #????????????
  si_se = models.IntegerField( null=False) #????????????
  si_ha = models.IntegerField( null=False) #????????????
  si_tf = models.IntegerField( null=False) #????????????

  def __str__(self):
    return self.m_Id
  











