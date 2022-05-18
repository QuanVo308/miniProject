from django.db import models
from django.forms import CharField

# Create your models here.
class SampleData(models.Model):
    ip = models.CharField(max_length=100, default="10.41.2.28")
    hostname = models.CharField(max_length=100, default="HNIB03405HW50")
    branch = models.CharField(max_length=100, default="BTHT1")
    zone = models.IntegerField(default=1)
    pop = models.CharField(max_length=100, default="HNIB034")
    type = models.CharField(max_length=100, default="HUAWEI")
    function = models.CharField(max_length=100, default="SW-FTI-BB")
    model = models.CharField(max_length=100, default="HW50")
    province = models.CharField(max_length=100, default="HNI")
    total_mac = models.IntegerField(default=35)
    smart_link = models.BooleanField(default=False)
    sep = models.BooleanField(default=False)
    stack = models.BooleanField(default=False)
    number_of_pop_tail = models.IntegerField(default=0)
    patch_ver = models.CharField(max_length=100, default="s5720si-v200r011sph007")
    patch_state = models.CharField(max_length=100, default="running")
    software_ver = models.CharField(max_length=100, default="S5720 V200R011C10SPC600")
    switch_type = models.CharField(max_length=100, default="S5720-28X-")
