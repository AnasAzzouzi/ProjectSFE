from django.db import models
from .Company_Model import Company
from .User import User
from django.db.models.signals import post_save
from django.dispatch import receiver 
from .managers import UserManager
from django.contrib.auth.models import Group

from django.contrib.auth.hashers import make_password

class Recruiter(models.Model):
    FirstName=models.CharField(max_length=100)
    LastName=models.CharField(max_length=100)
    Email=models.EmailField(max_length=100)
    Password=models.CharField(max_length=100)
    company=models.OneToOneField(Company,on_delete=models.CASCADE,null=True,blank=True)

@receiver(post_save, sender=Recruiter)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        user=User()
        user.first_name=instance.FirstName
        user.last_name=instance.LastName
        user.email=instance.Email
        user.password=instance.Password
        user.is_recruiter=True
        user.external_id=instance.id
        user.save()
        instance.Password=make_password(instance.Password)
        instance.save()
        recruiters=Group.objects.get(name='Recruiters')
        recruiters.user_set.add(user)

@receiver(post_save, sender=Recruiter)
def save_user_profile(sender, instance, **kwargs):
    user=User.objects.get(external_id=instance.id)
    user.first_name=instance.FirstName
    user.last_name=instance.LastName
    user.email=instance.Email
    user.password=instance.Password
    user.save()
