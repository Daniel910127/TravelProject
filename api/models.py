from django.db import models

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title
  
class Account(models.Model):
  a_Account = models.CharField(max_length=20, null=False)
  a_Password = models.CharField(max_length=20, null=False)
  a_Level = models.IntegerField(null=False )

  def __str__(self):
    return self.a_Id

  