from django.shortcuts import render
from ..serializers import FullInternSerializer,InternSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from ..models import Intern,User
from rest_framework.authtoken.models import Token

#DOWNLOAD
import os
from django.conf import settings
from django.http import HttpResponse, Http404
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def AllInterns(request):
    interns=Intern.objects.all()
    serializer=FullInternSerializer(interns,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def InternById(request):
    idIntern=request.GET.get('id')
    intern=Intern.objects.get(id=idIntern)
    serializer=FullInternSerializer(intern,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def InternByField(request):
    idField=request.GET.get('idField')
    interns=Intern.objects.filter(field=idField)
    serializer=InternSerializer(interns,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def InternByLocation(request):
    idLocation=request.GET.get('idLocation')
    interns=Intern.objects.filter(location=idLocation)
    serializer=InternSerializer(interns,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def CreateIntern(request):
    serializer=InternSerializer(data=request.data)
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
def UpdateIntern(request):
    idIntern=request.data['id']
    intern=Intern.objects.get(id=idIntern)
    serializer=InternSerializer(instance=intern,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Updated')
    else:
        print(serializer.errors)
        return Response('Not valid')

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteIntern(request):
    idIntern=request.GET.get('id')
    intern=Intern.objects.get(id=idIntern)
    intern.delete()
    return Response('Deleted')

@api_view(['GET'])
def FilteredInterns(request):
    field=request.GET.get('field')
    location=request.GET.get('location')
    print(field)
    print(location)
    if field == '0' and location != '0':
        interns=Intern.objects.filter(location=location)
    elif field != '0' and location == '0':
        interns=Intern.objects.filter(field=field)
    elif field != '0' and location !='0':
        interns=Intern.objects.filter(location=location,field=field)
    elif field=='0' and location=='0':
        interns=Intern.objects.all()
    serializer=FullInternSerializer(interns,many=True)
    return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def GetProfilePicture(request):
    path=request.GET.get('filePath')
    path=path[7:]
    file_path =os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="image/jpeg")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404






