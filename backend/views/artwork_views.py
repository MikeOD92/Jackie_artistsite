from django.shortcuts import render

from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from django.core.files.storage import default_storage

from ..models import *
from ..serializers import ArtworkMediaSerializer, ArtworkSerializer, CreateArtworkSerializer

### generic API view for people visiting the site, they can view all and single artworks. 
class ArtworkAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Artwork.objects.all().order_by('-id')
    serializer_class = ArtworkSerializer

    def get(self, request, pk=None):
        if pk:
            return Response({
                'data': self.retrieve(request,pk).data
            })
        return self.list(request)

# File upload

class Upload(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAdminUser]

    def post(self, request):

        response_data = []

        for file in request.FILES.getlist('image'):
            file_name = default_storage.save(file.name, file)
            url = default_storage.url(file_name)
            response_data.append(url)

        return Response({
            'data':response_data
        })

# creation API view, requires user to to logged in to POST new works
class ArtworkCreationProtectedAPIView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    queryset = Artwork.objects.all().order_by('-id')
    serializer_class = CreateArtworkSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        self.create(request).data
        return self.list(request)

# API view for all non creation functions on artworks
class ArtworkProtectedAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Artwork.objects.all().order_by('-id')
    serializer_class = ArtworkSerializer
    permission_classes = [IsAdminUser]

    def put(self, request, pk=None):
        self.partial_update(request, pk).data
        return self.list(request)

    
    def delete(self, request, pk=None):
        self.destroy(request, pk)
        return self.list(request).data

class ArtworkMediaProtectedAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin ):
    queryset = ArtworkMedia.objects.all()
    serializer_class = ArtworkMediaSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)