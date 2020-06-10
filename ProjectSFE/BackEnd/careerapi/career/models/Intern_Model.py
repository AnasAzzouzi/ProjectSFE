from django.db import models
from .Location_Model import Location
from .Field_Model import Field
from .User import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group


class Intern(models.Model):
    FirstName=models.CharField(max_length=100,blank=True,null=True)
    LastName=models.CharField(max_length=100,blank=True,null=True)
    Email=models.EmailField(max_length=100)
    Password=models.CharField(max_length=100)
    Gender=models.CharField(max_length=10,blank=True,null=True)
    BirthDate=models.DateField(blank=True,null=True)
    Tel=models.CharField(max_length=100,blank=True)
    location=models.ForeignKey(Location,on_delete=models.CASCADE, blank=True, null=True)
    field=models.ForeignKey(Field,on_delete=models.CASCADE, blank=True, null=True)
    Image=models.FileField(upload_to='ProfileImage',default='ProfileImage/avatar.jpg',blank=True,null=True)
    


@receiver(post_save, sender=Intern)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        user=User()
        user.first_name=instance.FirstName
        user.last_name=instance.LastName
        user.email=instance.Email
        user.password=instance.Password
        user.is_intern=True
        user.external_id=instance.id
        user.save()
        instance.Password=make_password(instance.Password)
        instance.save()
        interns=Group.objects.get(name='Interns')
        interns.user_set.add(user)

@receiver(post_save, sender=Intern)
def save_user_profile(sender, instance, **kwargs):
    user=User.objects.get(external_id=instance.id)
    user.first_name=instance.FirstName
    user.last_name=instance.LastName
    user.email=instance.Email
    user.password=instance.Password
    user.save()