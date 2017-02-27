
from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name = 'home'),
    url(r'^perfis/(?P<perfil_id>\d+)$', views.perfil)
]
