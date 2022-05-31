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
import math

@csrf_exempt
def test(request):
    data = SampleData.objects.filter(id = 780).values()
    return JsonResponse({"record": list(data)})

page = 1
pageChange = False
@csrf_exempt
def index(request):
    global pageChange
    global page
    if pageChange:
        pageChange = False
    else:
        page = 1
    data = SampleData.objects.filter()
    header = ['ID', 'IP', 'Hostname','Branch', 'Zone', 'Pop', 'Type', 'Function', 'Model', 'Province', 'Total MAC', 'Smart link', 'Sep', 'Stack', 'Number of pop tail', 'patch ver', 'patch state', 'software ver', 'switch type' ]
    if request.user.is_authenticated:
        notice = "User is logged in as %s with a role %s" % (request.user.username, request.user.groups.all()[0])
        group = request.user.groups.all()[0]
        max_page = math.ceil(len(data)/100)
        min = (page-1) * 100
        max = (len(data)) if (min + 100 > len(data)) else min + 100
        print(page)
        temp_data = []
        for i in range(min, max):
            temp_data.append(data[i])
        return render(request, 'miniProject/home.html', {'notice':notice, 'group' : str(group), 'data' : temp_data, 'header' : header, 'maxpage':max_page, 'page':page})
    else:
        notice = "User is not logged in :("
        return render(request, 'miniProject/home.html', {'notice':notice, 'group' : "group", 'data' : data, 'header':header, 'maxpage':0, 'page':page})

def change_page(request):
    global page
    global pageChange
    print(request.GET['page'])
    pageChange = True
    page = int(request.GET['page'])
    return redirect('/home')

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

    userLogin = authenticate(username=request.POST['username'], password=request.POST['password'])

    if userLogin is not None:
        auth_login(request, userLogin)
        return render(request, 'miniProject/loginResult.html')
    else:
        return render(request, 'miniProject/loginResult.html')
            

def logout(request):
    global page
    page = 1
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
    return JsonResponse({"record": list(data)})

@csrf_exempt
def get_dynamic_pop_mac(request):
    print(request.GET['total_mac'])
    print(request.GET['number_of_pop_tail'])
    data = SampleData.objects.filter(total_mac = request.GET['total_mac'], number_of_pop_tail = request.GET['number_of_pop_tail']).values()
    print(type(data))
    return JsonResponse({"record": list(data)})

@csrf_exempt
def update_data(request, _id):
    data = SampleData.objects.get(id = _id)
    return render(request, "miniProject/update.html",{'data':data})

@csrf_exempt
def update_submit(request, _id):
    data = SampleData.objects.get(id = _id)

    data.hostname = request.POST['hostname']
    data.branch = request.POST['branch']
    data.zone = request.POST['zone']
    data.pop = request.POST['pop']
    data.type = request.POST['type']
    data.function = request.POST['function']
    data.model = request.POST['model']
    data.province = request.POST['province']
    data.itotal_macp = request.POST['total_mac']
    data.smart_link = request.POST['smart_link']
    data.sep = request.POST['sep']
    data.stack = request.POST['stack']
    data.number_of_pop_tail = request.POST['number_of_pop_tail']
    data.patch_ver = request.POST['patch_ver']
    data.patch_state = request.POST['patch_state']
    data.software_ver = request.POST['software_ver']
    data.switch_type = request.POST['switch_type']

    data.save()
    return redirect('/home')


@csrf_exempt
def delete_data(request, _id):
    data = SampleData.objects.get(id = _id)
    data.delete()
    return redirect('/home')

@csrf_exempt
def add_data(request):
    return render(request, "miniProject/add.html")

@csrf_exempt
def add_submit(request):
    data = SampleData()

    data.hostname = request.POST['hostname']
    data.branch = request.POST['branch']
    data.zone = request.POST['zone']
    data.pop = request.POST['pop']
    data.type = request.POST['type']
    data.function = request.POST['function']
    data.model = request.POST['model']
    data.province = request.POST['province']
    data.itotal_macp = request.POST['total_mac']
    data.smart_link = request.POST['smart_link']
    data.sep = request.POST['sep']
    data.stack = request.POST['stack']
    data.number_of_pop_tail = request.POST['number_of_pop_tail']
    data.patch_ver = request.POST['patch_ver']
    data.patch_state = request.POST['patch_state']
    data.software_ver = request.POST['software_ver']
    data.switch_type = request.POST['switch_type']

    data.save()
    return redirect('/home')