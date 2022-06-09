from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .rest_views import *
from rest_framework.routers import SimpleRouter

route = SimpleRouter()
route.register(r'rest', RestView)

app_name = 'api'
urlpatterns = [
  path('', views.index, name='index'),
  path('getuser/', views.get_login_user, name="getUser"),
  path('logout/', views.logout, name='logout'),
  path('login', views.login, name='login'),
  path('test', views.test, name='test'),
  path('getdata', views.get_all, name='getData'),
  path('register', views.register, name="register"),
  path('getpermission', views.get_permission, name='permission'),
  path('delete', views.delete_record, name="delete"),
  path('add', views.add_data, name="add_data"),
  path('update', views.update_data, name="update_data"),
  path('search', views.searchData, name="serch_data"),
] + route.urls
