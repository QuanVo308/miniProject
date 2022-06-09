from django.contrib import admin
from .models import SampleData


class SampleDataAdmin(admin.ModelAdmin):
    list_filter = ('branch',)


admin.site.register(SampleData, SampleDataAdmin)
