from os import popen
from django.http import HttpResponse, JsonResponse
from .models import SampleData
import random
from django.shortcuts import render, get_object_or_404, redirect
from .form import LoginForm  
from django.contrib.auth import authenticate, logout as auth_logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.db.models import Q

@csrf_exempt
def index(request):
    group = ""
    if request.user.is_authenticated:
        notice = "User is logged in as %s with a role %s" % (request.user.username, request.user.groups.all()[0])
        group = request.user.groups.all()[0]
        return render(request, 'miniProject/home.html', {'notice':notice, 'group' : group})
    else:
        notice = "User is not logged in :("
        return render(request, 'miniProject/home.html', {'notice':notice, 'group' : group})


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

def login_authen(request):

    form = LoginForm(request.POST)

    userLogin = authenticate(username=request.POST['username'], password=request.POST['password'])

    if userLogin is not None:
        auth_login(request, userLogin)
        return render(request, 'miniProject/loginResult.html')
    else:
        return render(request, 'miniProject/loginResult.html')
            

def logout(request):
    auth_logout(request)
    return render(request, 'miniProject/logout.html')

def register(request):
    return render(request, 'miniProject/register.html')

def register_submit(request):
    try:
        user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
        group = Group.objects.get(name = request.POST['accountGroup'])
        user.save()
        user.groups.add(group)
        return redirect('/home/login')
    except:
        return render(request, "miniProject/registerResult.html")

@csrf_exempt
def get_static_pop_mac(request):
    data = SampleData.objects.filter(Q(total_mac__gte = 100) | Q(number_of_pop_tail__gte = 30)).values()
    print(type(data))
    return JsonResponse({"data": list(data)})

@csrf_exempt
def get_dynamic_pop_mac(request):
    print(request.GET['total_mac'])
    print(request.GET['number_of_pop_tail'])
    data = SampleData.objects.filter(total_mac = request.GET['total_mac'], number_of_pop_tail = request.GET['number_of_pop_tail']).values()
    print(type(data))
    return JsonResponse({"data": list(data)})