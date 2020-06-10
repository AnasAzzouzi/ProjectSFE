from rest_framework import serializers
from .models import *
class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model=Field
        fields='__all__'
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Location
        fields='__all__'

class InternSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=InternSkill
        fields='__all__'

class FullInternSerializer(serializers.ModelSerializer):
    is_intern=serializers.BooleanField(default=True)
    internSkills=InternSkillSerializer(many=True)
    class Meta:
        model=Intern
        fields=[field.name for field in model._meta.fields]
        fields.append('internSkills')
        fields.append('is_intern')

class InternSerializer(serializers.ModelSerializer):
    class Meta:
        model=Intern
        fields="__all__"
        
class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Recruiter
        fields=[]
        for field in model._meta.fields:
            fields.append(field.name)          
class CompanySkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanySkill
        fields='__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields='__all__'
class OfferTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=OfferType
        fields='__all__'
        
class InternShipOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model=InternShipOffer
        fields='__all__'


class OfferApplicationSerializer(serializers.ModelSerializer):
    intern=InternSerializer()
    internShipOffer=InternShipOfferSerializer()
    class Meta:
        model=OfferApplication
        fields=[field.name for field in  model._meta.fields]
        fields.append('internShipOffer')
        fields.append('intern')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

class DetailedOfferSerializer(serializers.ModelSerializer):
    company=CompanySerializer()
    class Meta:
        model=InternShipOffer
        fields=[field.name for field in  model._meta.fields]
        fields.append('company')


       
