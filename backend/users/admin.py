from django.contrib import admin
from .models import CustomUser, CaloriesLimit
# Register your models here.


admin.site.register(CustomUser)
admin.site.register(CaloriesLimit)