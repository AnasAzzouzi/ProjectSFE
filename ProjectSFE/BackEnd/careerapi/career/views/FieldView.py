from django.shortcuts import render
from ..serializers import FieldSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response

from ..models  import Field


@api_view(['GET'])
def AllFields(request):
    fields=Field.objects.all()
    serializer=FieldSerializer(fields,many=True)
    return Response(serializer.data)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def FieldById(request):
    idField=request.GET.get('id')
    field=Field.objects.get(id=idField)
    serializer=FieldSerializer(field,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateField(request):
    serializer=FieldSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Field Created")
    else:
        return Response("Sorry SomeThing Went Wrong !")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateField(request):
    
        idField=request.data['id']
        field=Field.objects.get(id=idField)
        serializer=FieldSerializer(instance=field,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response("Sorry SomeThing Went Wrong !")
    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteField(request):
    idField=request.GET.get('id')
    field=Field.objects.get(id=idField)
    field.delete()
    return Response('Deleted')