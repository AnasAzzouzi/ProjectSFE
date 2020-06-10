from django.db import models
from .Intern_Model import Intern
from .Skill_Model import Skill
class InternSkill(Skill):
    intern=models.ForeignKey(Intern,related_name='internSkills',on_delete=models.CASCADE)
