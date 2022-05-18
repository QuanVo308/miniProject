import random
from .models import SampleData

ip = "10.41.2.28"
hostname = "HNIB03405HW50"
branch = "BTHT1"
zone = 1
pop = "HNIB034"
type = "HUAWEI"
function = "SW-FTI-BB"
model = "HW50"
province = "HNI"
total_mac = 35
smart_link = False
sep = False
stack = False
number_of_pop_tail = 0
patch_ver = "s5720si-v200r011sph007"
patch_state = "Running"
software_ver = "S5720 V200R011C10SPC600"
switch_type = "S5720-28X-"

# for i in range(3000):
#     total_mac = random.randint(0,10000)
#     number_of_pop_tail = random.randint(0,10)
#     SampleData temp = SampleData
temp = SampleData(number_of_pop_tail = 1, total_mac = 1)
temp.save()

