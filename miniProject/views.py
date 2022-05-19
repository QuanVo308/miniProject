from os import popen
from django.http import HttpResponse
from .models import SampleData
import random
from django.shortcuts import render, get_object_or_404, redirect
from .form import LoginForm  
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User


def index(request):
    if request.user.is_authenticated:
        notice = "User is logged in as: %s" % request.user.username
        return render(request, 'miniProject/home.html', {'notice':notice})
    else:
        notice = "User is not logged in :("
        return render(request, 'miniProject/home.html', {'notice':notice})


def temp(request):
    for i in range(3000):
        mac = random.randint(0,10000)
        pop = random.randint(0,10)
        print(i, mac, pop)
        temp = SampleData(number_of_pop_tail = pop, total_mac = mac)
        temp.save()
    return HttpResponse("ok")

def login(request):
    return render(request, 'miniProject/login.html')

def loginAuthen(request):

    form = LoginForm(request.POST)

    userLogin = authenticate(username=request.POST['username'], password=request.POST['password'])

    if userLogin is not None:
        auth_login(request, userLogin)
        return render(request, 'miniProject/loginResult.html')
    else:
        return render(request, 'miniProject/loginResult.html')
            

def Logout(request):
    logout(request)
    return render(request, 'miniProject/logout.html')

def Register(request):
    return render(request, 'miniProject/register.html')

def registerSubmit(request):
    user = User.objects.create_user(request.POST['username'], print(request.POST['email']), request.POST['password'])
    return redirect('/home/login')