from django.shortcuts import render
from ..serializers import CompanySkillSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from ..models import CompanySkill

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CompanySkills(request):
    CompanyId=request.GET.get('CompanyId')
    companySkills=CompanySkill.objects.filter(company=CompanyId)
    serializer=CompanySkillSerializer(companySkills,many=True)
    return Response(serializer.data)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateCompanySkill(request):
    serializer=CompanySkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Saved')
    else:
        return Response('Not Saved')

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateCompanySkill(request):
    id=request.data['id']
    companySkill=CompanySkill.objects.get(id=id)
    serializer=CompanySkillSerializer(instance=companySkill,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Updated')
    else:
        return Response('Not Updated')
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteCompanySkill(request):
    id=request.GET.get('id')
    companySkill=CompanySkill.objects.get(id=id)
    companySkill.delete()
    return Response('Deleted')
