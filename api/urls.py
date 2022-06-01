from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = 'api'
urlpatterns = [
    path('', views.index, name='index'),
    path('getuser/', views.get_login_user, name="getUser"), 
    path('logout/', views.logout, name='logout'),
    path('login', views.login, name='login'),
    path('test', views.test, name='test'),
    path('getdata', views.get_all, name='getData')
]