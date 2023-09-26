from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, account, password,username,email, rank=0):
        account = self.model(
            account=account,
            rank=rank,
            username=username,
            email=email
        )
        account.set_password(password)
        account.save(using=self._db)
        return account


    def create_superuser(self, account, password,username,email, rank=999):
        account = self.create_user(
            account=account,
            password=password,
            rank=rank,
            username=username,
            email=email
        )
        account.is_superuser = True
        account.is_staff = True
        account.save(using=self._db)
        return account

class Account(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    account = models.CharField(max_length=20, null=False, unique=True)
    email = models.EmailField(unique=True, default='')
    username = models.CharField(max_length=100, default='')
    rank = models.IntegerField(null=False, default=0)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'account'

    objects = AccountManager()

    def save(self, *args, **kwargs):
        if not self.email:  # 如果 email 字段尚未設置
            self.email = f'{self.account}@gmail.com'
        if not self.username:  # 如果 username 字段尚未設置
            self.username = self.account
        super().save(*args, **kwargs)

    def __str__(self):
        return self.account


#Travel_List database model
class Travel_List(models.Model):
  t_Id = models.AutoField( primary_key=True) 
  account = models.ForeignKey(to="Account",null=True, on_delete=models.CASCADE)
  t_Name = models.CharField(max_length=10, null=False)#行程表名稱
  t_Description = models.CharField(max_length=10, null=False)#行程表簡介
  t_FormTime = models.DateTimeField(auto_now=True)#行程表建立時間
  t_StartDate = models.CharField(max_length=100,null=False)#旅行開始日期
  t_EndDate = models.CharField(max_length=100,null=False)#旅行結束日期
  t_StayDay = models.IntegerField(null=False, default=1)#旅行停留時間
  t_Privacy = models.CharField(max_length=2, null=False, default='n')#行程表公開與否
  t_Views =  models.IntegerField(null=False)#行程表瀏覽次數
  t_Likes =  models.IntegerField(null=False)#行程表喜歡次數
  t_score = models.IntegerField(null=False,default=0)#行程表獲得總分數
  

  def __str__(self):
    return self.t_Name
  
#Travel_List_detail database model
class Travel_List_Detail(models.Model):
  tl_Id = models.AutoField( primary_key=True) 
  t_Id = models.ForeignKey(to="Travel_List", on_delete=models.CASCADE)  
  s_Id =  models.ForeignKey(to="Spot",null=True,on_delete=models.CASCADE)  
  f_Id =  models.ForeignKey(to="Food",null=True, on_delete=models.CASCADE)  
  h_Id =  models.ForeignKey(to="Hotel",null=True, on_delete=models.CASCADE)  
  tl_TransportMode = models.CharField(max_length=20, null=True)#到該景點交通工具
  tl_TransportTime = models.IntegerField(null=True) #交通工具移動時間
  tl_StayTime =  models.IntegerField(max_length=10, null=False,default=2)#停留時間
  tl_Day = models.IntegerField(null=False,default=1)#該景點屬於第幾天
  tl_Order = models.DecimalField(max_digits=5, decimal_places=5,
                                      blank=True, null=False,
                                      default=0)#該景點順序
  tl_Notes = models.CharField(max_length=200, null=True)#景點小筆記
  tl_score = models.IntegerField(null=False,default=0)#景點獲得分數
  
  def __str__(self):
    return self.tl_Notes

class Travel_List_StartTime(models.Model):
  tls_Id = models.AutoField( primary_key=True) 
  t_Id = models.ForeignKey(to="Travel_List", on_delete=models.CASCADE)  
  tls_Day = models.IntegerField(null=False,default=1) #該景點屬於第幾天
  tls_StartTime = models.IntegerField(null=False,default=28800)#景點起始時間
  

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
  s_Longitude = models.FloatField(max_length=10, null=False)
  s_Services =models.CharField(max_length=100, null=False)
  s_Category = models.CharField(max_length=100, null=False)
  s_UpdateTime =models.CharField(max_length=50, null=False)
  s_Stars = models.FloatField(max_length=10, null=True, default=None)  
  s_Reviews = models.IntegerField( null=True, default=None)
  s_Likes =  models.IntegerField( null=True, default=0)

  def __str__(self):
    return self.s_Name

#Hotel database model
class Hotel(models.Model):
  h_Id = models.AutoField( primary_key=True)  
  h_Name = models.CharField(max_length=50, null=False)
  h_Summary =  models.CharField(max_length=2000, null=True)
  h_Introduction =  models.TextField(max_length=400, null=True)
  h_OpenTime = models.CharField(max_length=2000, null=True)
  h_District = models.CharField(max_length=50, null=True)
  h_Address = models.CharField(max_length=100, null=False)
  h_Tel = models.CharField(max_length=20, null=True)
  h_Fax = models.CharField(max_length=50, null=True)
  h_Latitude = models.FloatField(max_length=10, null=False)
  h_Longitude = models.FloatField(max_length=10, null=False)
  h_Services =models.CharField(max_length=100, null=True)
  h_Category = models.CharField(max_length=100, null=False)
  h_UpdateTime =models.CharField(max_length=50, null=False)
  h_Stars = models.FloatField(max_length=10, null=True, default=None)  
  h_Reviews = models.IntegerField(null=True, default=None)
  h_Likes =  models.IntegerField( null=True, default=0)

  def __str__(self):
    return self.h_Name
 
#Food database model
class Food(models.Model):
  f_Id = models.AutoField( primary_key=True) 
  f_Lang = models.CharField(max_length=10, null=False)
  f_Name = models.CharField(max_length=50, null=False)
  f_Summary =  models.CharField(max_length=2000, null=False)
  f_Introduction =  models.TextField(max_length=1000, null=False)
  f_OpenTime = models.CharField(max_length=2000, null=False)
  f_District = models.CharField(max_length=50, null=False)
  f_Address = models.CharField(max_length=100, null=False)
  f_Tel = models.CharField(max_length=20, null=False)
  f_Fax = models.CharField(max_length=50, null=False)
  f_Latitude = models.FloatField(max_length=10, null=False)
  f_Longitude = models.FloatField(max_length=10, null=False)
  f_Services =models.CharField(max_length=100, null=False)
  f_Category = models.CharField(max_length=100, null=False)
  f_Consume = models.CharField(max_length=20, null=False)
  f_UpdateTime =models.CharField(max_length=50, null=False)
  f_Stars = models.FloatField(max_length=10, null=True, default=None)  
  f_Reviews = models.IntegerField( null=True, default=None)
  f_Likes =  models.IntegerField( null=True, default=0)

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
class  a_Picture(models.Model):
  ap_Id = models.AutoField( primary_key=True) 
  id = models.ForeignKey(to="Account",null=True, on_delete=models.CASCADE)
  ap_URL = models.ImageField(upload_to='images/account/', default=None)

  def __str__(self):
    return self.ap_URL

#h_Picture database model
class  h_Picture(models.Model):
  hp_Id = models.AutoField( primary_key=True) 
  h_Id =  models.ForeignKey(to="Hotel", on_delete=models.CASCADE) 
  hp_URL = models.ImageField(upload_to='images/hotel/', default=None)

  def __str__(self):
    return self.hp_URL
  
#Question database model
class Question(models.Model):
  q_Id = models.AutoField( primary_key=True) 
  s_Id = models.ForeignKey(to="Spot", on_delete=models.CASCADE)   
  q_question =models.CharField(max_length=100, null=False, default=None)
  q_answer = models.CharField(max_length=100, null=False, default=None)
  q_type = models.CharField(max_length=50, null=False, default=None)
  q_solution =models.CharField(max_length=100, null=False, default=None)
  q_right=models.IntegerField(null=False,default=0) 
  q_false=models.IntegerField(null=False,default=0) 

  def __str__(self):
    return self.q_question

#s_Interest database model
class s_Interest(models.Model):
  si_Id = models.AutoField( primary_key=True) 
  id = models.ForeignKey(to="Account", null=True,on_delete=models.CASCADE)
  si_hv = models.IntegerField( null=False) #溫泉渡假
  si_sa = models.IntegerField( null=False) #風景區
  si_os = models.IntegerField( null=False) #戶外運動
  si_la = models.IntegerField( null=False) #在地藝文
  si_mf = models.IntegerField( null=False) #無障礙設施
  si_ee = models.IntegerField( null=False) #生態教育
  si_ns = models.IntegerField( null=False) #自然景觀
  si_ff = models.IntegerField( null=False) #休閒農漁
  si_pg = models.IntegerField( null=False) #公園綠地
  si_tf = models.IntegerField( null=False) #觀光工廠
  si_pd = models.IntegerField( null=False) #熱門景點
  si_ha = models.IntegerField( null=False) #歷史古蹟
  si_np = models.IntegerField( null=False) #夜市夜遊
  si_tp = models.IntegerField( null=False) #主題園區
  si_se = models.IntegerField( null=False) #消費娛樂
  si_rt = models.IntegerField( null=False) #宗教廟宇
  si_lb = models.IntegerField( null=False) #景觀吊橋
  si_le = models.IntegerField( null=False) #地方展館
  
  
  
  
  
  

  def __str__(self):
    return self.id
  

#Like_Record database  model
class Like_Record(models.Model):
  r_Id = models.AutoField( primary_key=True) 
  id = models.ForeignKey(to="Account",null=True, on_delete=models.CASCADE)
  t_Id = models.ForeignKey(to="Travel_List",null=True, on_delete=models.CASCADE)  
  s_Id =  models.ForeignKey(to="Spot",null=True, on_delete=models.CASCADE)  
  f_Id =  models.ForeignKey(to="Food",null=True, on_delete=models.CASCADE)  
  h_Id =  models.ForeignKey(to="Hotel",null=True, on_delete=models.CASCADE) 
  
  def __str__(self):
    return self.id







