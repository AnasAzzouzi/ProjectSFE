from django.db import models
from ..models import Location,Field

from django.db.models.signals import post_save
from django.dispatch import receiver

class Company(models.Model):
    location=models.ForeignKey(Location,models.SET_NULL,blank=True,null=True,)
    field=models.ForeignKey(Field,models.SET_NULL,blank=True,null=True,)
    Name=models.CharField(max_length=200)
    Tel=models.CharField(max_length=20)
    WebSite=models.CharField(max_length=200)
    Email=models.EmailField(max_length=200)
    Description=models.TextField(blank=True,null=True,)
    CompanyLogo=models.FileField(upload_to='CompanyLogo',blank=True,null=True,)
    

