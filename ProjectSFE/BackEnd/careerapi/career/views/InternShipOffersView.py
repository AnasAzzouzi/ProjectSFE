from django.shortcuts import render
from ..serializers import InternShipOfferSerializer,DetailedOfferSerializer
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from ..models import InternShipOffer


@api_view(['GET'])
def AllInternShipOffers(request):
    internShipOffers=InternShipOffer.objects.all()
    serializer=DetailedOfferSerializer(internShipOffers,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def InternShipOffersByCompany(request):
    companyId=request.GET.get('companyId')
    internShipOffers=InternShipOffer.objects.filter(company=companyId)
    serializer=DetailedOfferSerializer(internShipOffers,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def InternShipOffersFiltered(request):
    offerType=request.GET.get('offerType')
    field=request.GET.get('field')
    if field == '0' and offerType != '0':
        internShipOffer=InternShipOffer.objects.filter(offerType=offerType)
    elif field != '0' and offerType == '0':
        internShipOffers=InternShipOffer.objects.filter(company__field=field)
    elif field != '0' and offerType !='0':
       internShipOffers=InternShipOffer.objects.filter(offerType=offerType,company__field=field)
    elif field=='0' and offerType=='0':
        internShipOffers=InternShipOffer.objects.all()
    serializer=DetailedOfferSerializer(internShipOffers,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def InternShipOfferById(request):
    id=request.GET.get('id')
    internShipOffer=InternShipOffer.objects.get(id=id)
    serializer=DetailedOfferSerializer(internShipOffer,many=False)
    return Response(serializer.data)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateInternShipOffer(request):
    serializer=InternShipOfferSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Saved')
    else:
        print(serializer.errors)
        return Response('Not Saved')

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateInternShipOffer(request):
    id=request.data['id']
    internshipOffer=InternShipOffer.objects.get(id=id)
    serializer=InternShipOfferSerializer(instance=internshipOffer,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Updated')
    else:
        return Response('Not Updated')

@api_view(['GET'])
def getDetailedOffer(request):
    id=request.GET.get('id')
    internShipOffer=InternShipOffer.objects.get(id=id)
    serializer=DetailedOfferSerializer(internShipOffer,many=False)
    return Response(serializer.data)
@api_view(['GET'])
def getAllDetailedOffers(request):
    internShipOffers=InternShipOffer.objects.all()
    serializer=DetailedOfferSerializer(internShipOffers,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getDetailedOffersByCompany(request):
    CompanyId=request.GET.get('CompanyId')
    internShipOffers=InternShipOffer.objects.filter(company=CompanyId)
    serializer=DetailedOfferSerializer(internShipOffers,many=True)
    return Response(serializer.data)

