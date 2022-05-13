from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from ..serializers import CustomTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from rest_framework import status, exceptions

# this is used as a view for login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            is_staff=True
        )

        serializer = CustomTokenObtainPairSerializer(user, many=False)
        return Response(serializer.data)
    except:
        return Response({'detail':'User already exists'}, status=status.HTTP_400_BAD_REQUEST)


## add view for updating password 
