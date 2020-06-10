from django.db import models 
class Skill(models.Model):

    SkillTitle=models.CharField(max_length=100)
    class Meta:
        abstract = True
    def __str__(self):
        return self.SkillTitle
