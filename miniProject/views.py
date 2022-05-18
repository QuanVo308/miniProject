from os import popen
from django.http import HttpResponse
from .models import SampleData
import random
from django.shortcuts import render, get_object_or_404
from .form import LoginForm  
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

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

def test(request):

    if request.method == 'POST':

        form = LoginForm(request.POST)

        userLogin = authenticate(username=request.POST['username'], password=request.POST['password'])

        if userLogin is not None:
            auth_login(request, userLogin)
            print(request.session)
            return HttpResponse("You are logged in")
        else:
            return HttpResponse("You are not logged in")
            
    return HttpResponse("nothing")

def testOut(request):
    logout(request)
    return HttpResponse("LogOut")