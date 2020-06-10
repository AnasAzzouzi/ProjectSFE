from django.shortcuts import render
from ..serializers import UserSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from ..models import User



@api_view(['POST'])
def UpdateAdmin(request):
    id=request.data['id']
    user=User.objects.get(id=id)
    serializer=UserSerializer(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Updated')
    else:
        print(serializer.errors)
        return Response('SomeThing Went Wrong !')

@api_view(['GET'])
def GetAdmin(request):
    id=request.GET.get('id')
    user=User.objects.get(id=id)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)
@api_view(['POST'])
def UpdateAdminPassword(request):
    id=request.data['id']
    user=User.objects.get(id=id)
    user.set_password(request.data['password'])
    return Response('Updated')