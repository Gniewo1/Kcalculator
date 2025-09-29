from django.shortcuts import render
from django.http import JsonResponse
from .models import Item, EatenItem
from rest_framework.response import Response
from .serializers import ItemSerializer, EatenItemSerializerPost, EatenItemSerializerGet
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status


def item_names(request):
    items = Item.objects.all().values('id', 'name')
    return JsonResponse(list(items), safe=False)

class ItemView(APIView):

    def get(self, request, pk=None):
        if pk:
            item = get_object_or_404(Item, pk=pk)
            serializer = ItemSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            items = Item.objects.all()
            serializer = ItemSerializer(items, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

class EatenItemView(APIView):

    def post(self, request):
        serializer = EatenItemSerializerPost(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request, date):
        items = EatenItem.objects.filter(date=date, user=request.user)
        serializer = EatenItemSerializerGet(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):

        try:
            item = EatenItem.objects.get(pk=pk, user=request.user)
        except EatenItem.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

        serializer = EatenItemSerializerPost(item, data=request.data, context={'request': request})
        if serializer.is_valid():
            grams = serializer.validated_data.get('grams') or 0
            portion = serializer.validated_data.get('portion') or 0
            item_obj = serializer.validated_data.get('item', item.item)
            serializer.save(calories=grams * item_obj.cal_in_gram + portion * item_obj.cal_in_portion)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


