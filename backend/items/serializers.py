from rest_framework import serializers
from .models import Item, EatenItem

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'id',
            'name',
            'cal_in_gram',
            'cal_in_portion',
        ]

class EatenItemSerializer(serializers.ModelSerializer):
    grams = serializers.DecimalField(max_digits=6, decimal_places=2, required=False)
    portion = serializers.DecimalField(max_digits=6, decimal_places=2, required=False)
    class Meta:
        model = EatenItem
        fields = '__all__'
