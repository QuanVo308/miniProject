from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = 'miniProject'
urlpatterns = [
    path('', views.index, name='index'),
    path('generateData/', views.temp, name='temp'),
    path('login/',views.login, name="login"),
    path('loginAuthen/',views.loginAuthen, name="loginAuthen"),
    path('logout/',views.Logout, name="logout"),
    path('register/', views.Register, name="register"),
    path('registerSubmit/', views.registerSubmit, name="registerSubmit"),

]