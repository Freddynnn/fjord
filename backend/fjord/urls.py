"""
URL configuration for fjord project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from media.views import test_view, UserViewSet, MediaItemViewSet, CreatorViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'mediaitems', MediaItemViewSet)
router.register(r'creators', CreatorViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', test_view),  
    path('api/', include(router.urls)), 
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
