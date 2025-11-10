from rest_framework import serializers
from .models import CustomUser, CaloriesLimit
from django.contrib.auth import authenticate

# Rejestracja
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# Użytkownik
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

# Logowanie
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Nieprawidłowe dane logowania")
    
class CaloriesLimitSerializer(serializers.ModelSerializer):
        class Meta:
            model = CaloriesLimit
            fields = ('id', 'month', 'calories_limit')
