from django.db import models
from .Company_Model import Company
from .OfferType_Model import OfferType
from django.utils import timezone
class InternShipOffer(models.Model):
    offerType=models.ForeignKey(OfferType,on_delete=models.CASCADE,blank=True,null=True)
    company=models.ForeignKey(Company,on_delete=models.CASCADE,blank=True,null=True)
    Description=models.TextField()
    OfferDate=models.DateTimeField(default=timezone.now)
    
    