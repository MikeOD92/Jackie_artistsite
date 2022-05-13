from django.shortcuts import render

from backend.serializers import ArtworkSerialzer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import *
from ..serializers import ArtworkMediaSerializer, ArtworkSerialzer, CreateArtworkSerializer

@api_view(['GET'])
def getWork(request, pk=None):
    if pk:
        artwork = Artwork.objects.get(id=pk)
        serializer = ArtworkSerialzer(artwork, many=False)
        return Response(serializer.data)
    else:
        artworks = Artwork.objects.all()
        serializer = ArtworkSerialzer(artworks, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def postWork(request):
    serializer = CreateArtworkSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)