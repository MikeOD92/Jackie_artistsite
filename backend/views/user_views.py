from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from ..serializers import CustomTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from rest_framework import status, exceptions
from rest_framework.permissions import IsAdminUser

from backend import serializers

# this is used as a view for login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViews(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        data = request.data

        try:
            user = User.objects.create(
                username=data['email'],
                email = data['email'],
                password=make_password(data['password']),
                is_staff=True
            )
            serializer = UserSerializer

            return Response({
                'data': serializer(user).data
            })

        except:
            return Response({'message': "error"}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request):
        user = request.user

        if request.data['password'] != request.data['password_confirm']:
            raise exceptions.ValidationError('passwords do not match')

        user.set_password(request.data['password'])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

## add view for updating password 
