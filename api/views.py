from http.client import OK
from miniProject.models import SampleData
from os import popen, path
from django.http import HttpResponse, JsonResponse
import random
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, logout as auth_logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.db.models import Q
import math
import json
from rest_framework.authtoken.models import Token

# Create your views here.
records_in_page = 100

@csrf_exempt
def index(request):
    data = SampleData.objects.filter(id = 780).values()
    return JsonResponse({"record": list(data)})

def getRandomIP():
    rand_num = random.randrange(0, 256)
    ip = str(rand_num) + '.'
    rand_num = random.randrange(0, 256)
    ip += str(rand_num) + '.'
    rand_num = random.randrange(0, 256)
    ip += str(rand_num) + '.'
    rand_num = random.randrange(0, 256)
    ip += str(rand_num)
    return ip

@csrf_exempt
def test(request):
    data = SampleData.objects.filter()
    state=['running', 'terminating', 'initiating']

    for i in data:
        setattr(i, 'patch_state', state[random.randrange(0,3)])
        print(i, i.patch_state)
        i.save()
    
    return HttpResponse(getRandomIP())

@csrf_exempt
def get_login_user(request):
    # return HttpResponse(request.user.username)
    user = request.user.username
    return JsonResponse({"user": user})

@csrf_exempt
def logout(request):
    # print(request.user)
    auth_logout(request)
    return JsonResponse({"response": "logout"}) 

@csrf_exempt
def login(request):
    data = json.loads(request.body.decode('utf-8'))
    # print(data['username'], data['password'])

    userLogin = authenticate(username=data['username'], password=data['password'])

    if userLogin is not None:
        auth_login(request, userLogin)
        # print(userLogin)
        token = Token.objects.get_or_create(user=request.user)
        # print("token key", token, request.user)
        return HttpResponse('success')
    else:
        return HttpResponse('fail')

@csrf_exempt
def get_all(request): 
    data = []
    s = True if request.GET['reverse'] == 'true'  else False
    sort =  'id'
    if (request.GET['sort']): sort = request.GET['sort']
    print(request.GET)
    tdata = SampleData.objects.filter().values()
    for i in range(0, len(tdata)):
        data.append(tdata[i])
    data.sort(key=lambda x: x[sort], reverse=s )
    max_page = math.ceil(len(data)/records_in_page)
    page = int(request.GET['page']) if (int(request.GET['page']) < max_page) else max_page
    min = (page-1) * records_in_page
    max = (len(data)) if (min + records_in_page > len(data)) else min + records_in_page

    temp_data = []
    for i in range(min, max):
        temp_data.append(data[i])
    
    return JsonResponse({
        "response": "ok",
        "max_page": max_page,
        "page": page,
        "record": list(temp_data),
    })

@csrf_exempt
def register(request):
    data = json.loads(request.body.decode('utf-8'))
    # print(data)
    try:
        user = User.objects.create_user(data['username'], data['email'], data['password'])
        group = Group.objects.get(name = data['accountGroup'])
        user.save()
        user.groups.add(group)
        return JsonResponse({
            "response": "ok"
        })
    except:
        return JsonResponse({
            "response": "fail"
        })

@csrf_exempt
def get_permission(request):
    if request.user.groups.all():
        group = request.user.groups.all()[0]
        # print(request.user.groups.all()[0])
        return HttpResponse(group)
    return HttpResponse('unidentified')

@csrf_exempt
def delete_record(request):
    data = SampleData.objects.filter(id = request.GET['id'])

    data.delete()

    return HttpResponse(OK)

@csrf_exempt
def add_data(request):

    new = json.loads(request.body.decode('utf-8'))

    data = SampleData()

    for i in new:
        setattr(data, i, new[i])

    try:
        data.save()
        return HttpResponse("ok")
    except:
        return HttpResponse("fail")

@csrf_exempt
def update_data(request):

    new = json.loads(request.body.decode('utf-8'))

    data = SampleData.objects.get(id = new['id'])

    # print(data)
    for i in new:
        # print(i, new[i])
        setattr(data, i, new[i])
        # print(i, new[i])
    
    # print("Hello")
    try:
        data.save()
        return HttpResponse("ok")
    except:
        return HttpResponse("fail")

@csrf_exempt
def searchData(request):
    search = json.loads(request.body.decode('utf-8'))
    s = Q()
    data=[]
    max_page=1
    page=1
    sort = search['reverse']
    # print("hahah",search['reverse'], search['sort'])
    for i in search:
        # print(i)
        if i != 'page' and i!='sort' and i!='reverse':
            if(search[i]):
                s &= Q(('%s__startswith' % i, search[i]))
    # print(search)
    if(s != Q()):
        tdata = SampleData.objects.filter(s).values()
        if tdata:
            # data.sort(key=lambda x: x['total_mac'], reverse=True)
            
            for i in range(0, len(tdata)):
                data.append(tdata[i])
            data.sort(key=lambda x: x[search['sort']], reverse=search['reverse'])
            max_page = math.ceil(len(data)/records_in_page)
            page = int(search['page']) if (int(search['page']) < max_page) else max_page
            # print("maxpage", max_page, len(data))
            
            min = (page-1) * records_in_page
            max = (len(data)) if (min + records_in_page > len(data)) else min + records_in_page
            temp_data = []
            for i in range(min, max):
                temp_data.append(data[i])
            # temp_data.sort(key=lambda x: x['total_mac'], reverse=True)
            return JsonResponse({
                "response": "ok",
                "record": list(temp_data),
                "maxpage": max_page,
            })
    return JsonResponse({
                "response": "fail",
    })
