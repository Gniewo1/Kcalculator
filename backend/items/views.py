from django.shortcuts import render
from django.http import JsonResponse
from .models import Item, EatenItem
from rest_framework.response import Response
from .serializers import ItemSerializer, EatenItemSerializerPost, EatenItemSerializerGet
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.db.models import Sum


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

    
class EatenItemViewSet(viewsets.ModelViewSet):
    queryset = EatenItem.objects.all()
    serializer_class = EatenItemSerializerPost

    def get_queryset(self):
        """
        Filtruj tylko itemy zalogowanego usera
        oraz opcjonalnie po dacie (?date=YYYY-MM-DD).
        """
        user = self.request.user
        queryset = EatenItem.objects.filter(user=user)

        date = self.request.query_params.get('date')
        if date:
            queryset = queryset.filter(date=date)

        return queryset

    def get_serializer_class(self):
        """
        Zależnie od akcji zwracamy różny serializer.
        """
        if self.action in ['list', 'retrieve']:
            return EatenItemSerializerGet
        return EatenItemSerializerPost

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        grams = serializer.validated_data.get('grams') or 0
        portion = serializer.validated_data.get('portion') or 0
        item_obj = serializer.validated_data.get('item', serializer.instance.item)
        if grams != 0:
            calories= grams * item_obj.cal_in_gram
        elif portion != 0:
            calories= portion * item_obj.cal_in_portion
        else: calories = 0
        serializer.save(
            calories = calories
        )

    @action(detail=False, methods=['get'])
    def monthly_summary(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        if not year or not month:
            return Response({'error': 'Missing year or month'}, status=400)

        try:
            year = int(year)
            month = int(month)
        except ValueError:
            return Response({'error': 'Year and month must be integers'}, status=400)

        items = (
            EatenItem.objects
            .filter(user=request.user, date__year=year, date__month=month)
            .values('date')
            .annotate(total_calories=Sum('calories'))
            .order_by('date')
        )

        return Response(list(items))


