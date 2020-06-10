from django.db import models
from .InternSkill_Model import Intern
from .InternShipOffer_Model import InternShipOffer
class OfferApplication(models.Model):
    intern=models.ForeignKey(Intern,on_delete=models.CASCADE)
    internShipOffer=models.ForeignKey(InternShipOffer,on_delete=models.CASCADE)
    ApplicationText=models.TextField()
    cv=models.FileField(blank=True,null=True)
    

