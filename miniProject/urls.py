from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = 'miniProject'
urlpatterns = [
    path('', views.index, name='index'),
    path('generateData/', views.temp, name='temp'),
    path('login/',views.login, name="login"),
    path('loginAuthen/',views.login_authen, name="loginAuthen"),
    path('logout/',views.logout, name="logout"),
    path('register/', views.register, name="register"),
    path('registerSubmit/', views.register_submit, name="registerSubmit"),
    path('get1/', views.get_static_pop_mac, name='get1'),
    path('get2/', views.get_dynamic_pop_mac, name='get2'),

]