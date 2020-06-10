from django.shortcuts import render
from django.contrib.auth import authenticate,logout,login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import UserSerializer,InternSerializer,RecruiterSerializer,FullInternSerializer
from ..models import User,Recruiter,Intern
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class authenticateUser(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if user.is_admin==False :
            res={
                'token': token.key,
                'id': user.external_id,
                'email': user.email,
                'is_intern':user.is_intern,
                'is_recruiter':user.is_recruiter,
                'is_admin':user.is_admin,
            }
        else:
            res={
                'token': token.key,
                'id': user.id,
                'email': user.email,
                'is_admin':user.is_admin,
            }
        return Response(res)





"""

@api_view(['POST','GET'])
def authenticateUser(request):
    userEmail=request.data['email']
    password=request.data['password']
    user=authenticate(email=userEmail,password=password)
    
    if user is not None:
        login(request,user)
        user=User.objects.get(email=userEmail)
        serializer=UserSerializer(user,many=False)
        if user.is_recruiter:
            recruiter=Recruiter.objects.get(Email=userEmail)
            myData={
                "id":recruiter.id,
                "is_recruiter":True,
                "sessionid":request.session.session_key
            }            
            return Response(data=myData,status=status.HTTP_200_OK)
        elif user.is_intern:
            intern=Intern.objects.get(Email=userEmail)
            myData={
                "id":intern.id,
                "is_intern":True,
                "sessionid":request.session.session_key

            }
            request.session.set_test_cookie()
            return Response(data=myData,status=status.HTTP_200_OK)
        else:
            return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(['POST'])

def Logout(request):
    logout(request)
    return Response('logged out')
   
"""