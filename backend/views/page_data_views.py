from django.shortcuts import render

from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from ..models import *
from ..serializers import ExternalLinkSerializer, PageDataSerializer, PageDataCreateSerializer

class PagesAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = PageData.objects.all()
    serializer_class = PageDataSerializer

    def get(self, request):
        return self.list(request)

class PagesProtectedAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = PageData.objects.all()
    serializer_class = PageDataCreateSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })

    def put(self, request, pk=None):
        if pk:
            return Response ({
                'data': self.partial_update(request, pk).data
            })   

    def delete(self, request, pk=None):
        if pk:
            return Response({
                'data': self.destroy(request, pk).data
                })

class ExternalLinksAdminAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = ExternalLinks.objects.all()
    serializer_class = ExternalLinkSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })
        
    def put(self, request, pk=None):
        if pk:
            return Response ({
                'data': self.partial_update(request, pk).data
            })   

    def delete(self, request, pk=None):
        if pk:
            return Response({
                'data': self.destroy(request, pk).data
                })