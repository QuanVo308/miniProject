from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generateData/', views.temp, name='temp'),
    path('login/',views.login, name="login"),
    path('test/',views.test, name="test"),
    path('testout/',views.testOut, name="testout")

]