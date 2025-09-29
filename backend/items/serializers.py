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

class EatenItemSerializerPost(serializers.ModelSerializer):
    grams = serializers.DecimalField(max_digits=6, decimal_places=2, required=False)
    portion = serializers.DecimalField(max_digits=6, decimal_places=2, required=False)
    class Meta:
        model = EatenItem
        fields = '__all__'

class EatenItemSerializerGet(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_cal_gram = serializers.DecimalField(source='item.cal_in_gram', max_digits=6, decimal_places=2, read_only=True)
    item_cal_portion = serializers.DecimalField(source='item.cal_in_portion', max_digits=6, decimal_places=2, read_only=True)

    class Meta:
        model = EatenItem
        fields = ['user_id', 'item_name', 'grams', 'portion', 'date', 'item_cal_gram', 'item_cal_portion']
