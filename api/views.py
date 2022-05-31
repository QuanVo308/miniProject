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

# Create your views here.
@csrf_exempt
def index(request):
    data = SampleData.objects.filter(id = 780).values()
    return JsonResponse({"record": list(data)})