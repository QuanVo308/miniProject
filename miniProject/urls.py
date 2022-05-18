from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generateData/', views.temp, name='temp' )
]