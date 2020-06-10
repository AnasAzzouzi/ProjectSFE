from django.shortcuts import render
from ..serializers import OfferTypeSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from ..models import OfferType


@api_view(['GET'])
def AllOfferTypes(request):
    offerTypes=OfferType.objects.all()
    serializer=OfferTypeSerializer(offerTypes,many=True)
    return Response(serializer.data)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateOfferType(request):
    serializer=OfferTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Added")
    else:
        print(serializer.errors)
        return Response("Sorry SomeThing When Wrong Please Retry")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateOfferType(request):
    id=request.data['id']
    offerType=OfferType.objects.get(id=id)
    serializer=OfferTypeSerializer(instance=offerType,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Updated")
    else:
        return Response("Sorry SomeThing When Wrong Please Retry")
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteOfferType(request):
    id=request.GET.get('id')
    offerType=OfferType.objects.get(id=id)
    offerType.delete()
    return Response('Deleted')
