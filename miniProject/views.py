from os import popen
from django.http import HttpResponse
from .models import SampleData
import random


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