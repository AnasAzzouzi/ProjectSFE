from django.shortcuts import render
from ..serializers import InternSkillSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
import json 
from ..models import InternSkill
@api_view(['GET'])
def AllInternSkills(request):
    InternId=request.GET.get('id')
    internSkill=InternSkill.objects.filter(intern=InternId)
    serializer=InternSkillSerializer(internSkill,many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateInternSkill(request):
    serializer=InternSkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Saved")
    else:
        return Response("Not Saved , Not Valid ")
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateInternSkill(request):
    skillId=request.data['id']
    internSkill=InternSkill.objects.get(id=skillId)
    serializer=InternSkillSerializer(instance=internSkill,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Updated")
    else:
        return Response("Not Updated , Not Valid ")
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteInternSkill(request):
    idSkill=request.GET.get('id')
    internSkill=InternSkill.objects.get(id=idSkill)
    internSkill.delete()
    return Response('Deleted')

    
