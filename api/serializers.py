from rest_framework import serializers
from miniProject.models import *


class RestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleData
        fields = '__all__'
