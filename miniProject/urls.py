from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = 'miniProject'
urlpatterns = [
    path('', views.index, name='home'),
    path('generateData/', views.temp, name='temp'),
    path('login/',views.login, name="login"),
    path('loginAuthen/',views.login_authen, name="loginAuthen"),
    path('logout/',views.logout, name="logout"),
    path('register/', views.register, name="register"),
    path('registerSubmit/', views.register_submit, name="registerSubmit"),
    path('get1/', views.get_static_pop_mac, name='get1'),
    path('get2/', views.get_dynamic_pop_mac, name='get2'),
    path('<int:_id>/update', views.update_data, name = "update_data"),
    path('<int:_id>/updateSubmit', views.update_submit, name = "update_submit"),
    path('<int:_id>/delete', views.delete_data, name = "delete_data"),
    path('add/', views.add_data, name = "add_data"),
    path('addsubmit/', views.add_submit, name = "add_submit"),
    path('changePage/', views.change_page, name = "change_page"),
    path('test/', views.test, name = "test"),
]