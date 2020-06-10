from django.db import models

class Location(models.Model):
    LocationName=models.CharField(max_length=200)
    def __str__(self):
        return self.LocationName