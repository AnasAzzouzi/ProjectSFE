from .Company_Model import Company
from .Skill_Model import Skill
from django.db import models
class CompanySkill(Skill):
    company=models.ForeignKey(Company,related_name='companySkills',on_delete=models.CASCADE)
