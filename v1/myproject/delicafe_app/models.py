from django.db import models
from django.contrib.auth.models import AbstractUser

# デフォルトのUserモデルにroleを追加
class CustomUser(AbstractUser):
  email = models.EmailField(unique=True)
  role = models.CharField(max_length=20, default='user')
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

# Create your models here.
