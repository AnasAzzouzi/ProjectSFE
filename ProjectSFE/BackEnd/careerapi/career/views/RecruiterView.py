from django.shortcuts import render
from ..serializers import RecruiterSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from ..models import Recruiter,User
from rest_framework.authtoken.models import Token
@api_view(['GET'])
def AllRecruiters(request):
    recruiters=Recruiter.objects.all()
    serializer=RecruiterSerializer(recruiters,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def RecruiterById(request):
    idRecruiter=request.GET.get('id')
    recruiter=Recruiter.objects.get(id=idRecruiter)
    serializer=RecruiterSerializer(recruiter,many=False)
    return Response(serializer.data)
@api_view(['POST'])
def CreateRecruiter(request):
    serializer=RecruiterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(external_id=serializer.data['id'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.external_id,
            'email': user.email,
            'is_intern':user.is_intern,
            'is_recruiter':user.is_recruiter
        })
    else:
        return Response('Not Saved')
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateRecruiter(request):
    recruiterId=request.data['id']
    recruiter=Recruiter.objects.get(id=recruiterId)
    serializer=RecruiterSerializer(instance=recruiter,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Updated')
    else:
        return Response('Something went Wrong')
    
    
