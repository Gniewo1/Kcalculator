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
    calories = serializers.DecimalField(max_digits=6, decimal_places=2, read_only=True)  # nowe pole

    class Meta:
        model = EatenItem
        fields = '__all__' 

    def create(self, validated_data):
        item = validated_data['item']
        grams = validated_data.get('grams') or 0
        portion = validated_data.get('portion') or 0
        # obliczamy kalorie i zapisujemy w validated_data
        if grams != 0:
            validated_data['calories'] = grams * item.cal_in_gram
        elif portion != 0:
            validated_data['calories'] = portion * item.cal_in_portion
        else: validated_data['calories'] = 0
        
        return super().create(validated_data)

class EatenItemSerializerGet(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_cal_gram = serializers.DecimalField(source='item.cal_in_gram', max_digits=6, decimal_places=2, read_only=True)
    item_cal_portion = serializers.DecimalField(source='item.cal_in_portion', max_digits=6, decimal_places=2, read_only=True)
    item_id = serializers.CharField(source='item.id', read_only=True)

    class Meta:
        model = EatenItem
        fields = [ 'id', 'item_id', 'user_id', 'item_name', 'grams', 'portion', 'date', 'item_cal_gram', 'item_cal_portion', 'calories']
