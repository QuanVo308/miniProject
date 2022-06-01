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
@csrf_exempt
def index(request):
    data = SampleData.objects.filter(id = 780).values()
    return JsonResponse({"record": list(data)})

@csrf_exempt
def test(request):
    print(request.POST)
    # print(request.POST['name'])
    data = json.loads(request.body.decode('utf-8'))
    print(data)
    return HttpResponse('ok')

@csrf_exempt
def get_login_user(request):
    # return HttpResponse(request.user.username)
    user = request.user.username
    return JsonResponse({"user": user})

@csrf_exempt
def logout(request):
    print(request.user)
    auth_logout(request)
    return JsonResponse({"response": "logout"}) 

@csrf_exempt
def login(request):
    data = json.loads(request.body.decode('utf-8'))
    print(data['username'], data['password'])

    userLogin = authenticate(username=data['username'], password=data['password'])

    if userLogin is not None:
        auth_login(request, userLogin)
        print(userLogin)
        token = Token.objects.get_or_create(user=request.user)
        print("token key", token, request.user)

    return HttpResponse('ok')
    
    # userLogin = authenticate(username=request.GET['username'], password=request.GET['password'])

    # print(request.GET['username'], request.GET['password'])

    # if userLogin is not None:
    #     auth_login(request, userLogin)
    #     print(userLogin)
    #     return JsonResponse({"response": "success"}) 
    # else:
    #     return JsonResponse({"response": "fail"}) 