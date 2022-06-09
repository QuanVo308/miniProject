from rest_framework import viewsets, filters, mixins
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .pagination import *
from miniProject.models import *


class RestView(viewsets.ModelViewSet):
    queryset = SampleData.objects.all()
    serializer_class = RestSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = '__all__'
    ordering_fields = '__all__'
