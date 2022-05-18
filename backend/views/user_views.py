from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from ..serializers import CustomTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from rest_framework import status, exceptions

from backend import serializers

# this is used as a view for login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViews(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })

    def put(self, request):
        user = request.user

        if request.data['password'] != request.data['password_confirm']:
            raise exceptions.ValidationError('passwords do not match')

        user.set_password(request.data['password'])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

## add view for updating password 
