from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponse

from .models import MediaItem, Creator
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .serializers import MediaItemSerializer, CreatorSerializer, UserSerializer


def test_view(request):
    return HttpResponse("Backend is working")

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class MediaItemViewSet(viewsets.ModelViewSet):
    queryset = MediaItem.objects.all()
    serializer_class = MediaItemSerializer

class CreatorViewSet(viewsets.ModelViewSet):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer
