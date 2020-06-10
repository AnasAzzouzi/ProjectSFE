from django.db import models

# Create your models here.
class Field(models.Model):
    Name=models.CharField(max_length=200)

    def __str__(self):
        return self.Name
class Skill(models.Model):
    SkillTitle=models.CharField(max_length=200)
    field=models.ForeignKey(Field,on_delete=models.CASCADE)
    def __str__(self):
        return self.SkillTitle 