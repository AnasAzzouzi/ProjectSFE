from django.db import models

class OfferType(models.Model):
    TypeName=models.CharField(max_length=100)
