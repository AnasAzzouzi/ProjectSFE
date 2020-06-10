from django.shortcuts import render
from ..serializers import CompanySerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from ..models import Company
#DOWNLOAD
import os
from django.conf import settings
from django.http import HttpResponse, Http404
@api_view(['GET'])
def AllCompanies(request):
    companies=Company.objects.all()
    serializer=CompanySerializer(companies,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def CompanyByField(request):
    FieldId=request.GET.get('FieldId')
    if FieldId==0:
        companies=Company.objects.all()
    else:
        companies=Company.objects.filter(field=FieldId)
    serializer=CompanySerializer(companies,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def CompanyById(request):
    id=request.GET.get('id')
    company=Company.objects.get(id=id)
    serializer=CompanySerializer(company,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def CreateCompany(request):
    serializer=CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data['id'])
    else :
        return Response('Not Saved')
        
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateCompany(request):
    idCompany=request.data['id']
    company=Company.objects.get(id=idCompany)
    serializer=CompanySerializer(instance=company,data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(request.data)
        return Response(serializer.data['id'])
    else:
        return Response('Didn\'t Update')
@api_view(['GET'])
def GetCompanyLogo(request):
    path=request.GET.get('filePath')
    path=path[7:]
    file_path =os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="image/jpeg")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404



