from django.shortcuts import render
from django.http import JsonResponse
from .models import Item
from rest_framework.response import Response
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status


def item_names(request):
    items = Item.objects.all().values('id', 'name')
    return JsonResponse(list(items), safe=False)

class ItemsView(APIView):

    def get(self, request, pk=None):
        if pk:
            item = get_object_or_404(Item, pk=pk)
            serializer = ItemSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            items = Item.objects.all()
            serializer = ItemSerializer(items, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)



