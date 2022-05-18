from calendar import c
from django.contrib.auth.models import User 
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Artwork, ArtworkMedia, PageData, ExternalLinks

##### User Serializers
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'token', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)

######## CUSTOM TOKEN SERIALIZER 
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

#### Artwork and media Serializers

class CreateArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

class ArtworkMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkMedia
        fields = '__all__'

class ArtworkSerializer(serializers.ModelSerializer):
    work_img = ArtworkMediaSerializer(many=True)
    class Meta:
        model = Artwork
        fields = ['id', 'title', 'medium', 'dimensions', 'date', 'work_img' ]

#### Page Data Serializers

class ExternalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalLinks
        fields = '__all__'

class PageDataSerializer(serializers.ModelSerializer):
    links = ExternalLinkSerializer(many=True)
    class Meta:
        model = PageData
        fields = ['id', 'name', 'text', 'links']

class PageDataCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageData
        fields = '__all__'




