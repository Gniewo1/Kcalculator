from django.shortcuts import render
from django.http import JsonResponse
from .models import Item


def item_names(request):
    items = Item.objects.all().values('id', 'name')
    return JsonResponse(list(items), safe=False)



