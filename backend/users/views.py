from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CaloriesLimitSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import CaloriesLimit


# Rejestracja
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Logowanie
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Dane o aktualnym użytkowniku
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Sprawdza czy zalogowany
class AuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"user": request.user.username})
    
    
class CaloriesLimitViewSet(viewsets.ModelViewSet):
    queryset = CaloriesLimit.objects.all()
    serializer_class = CaloriesLimitSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = CaloriesLimit.objects.filter(user=user)

        month = self.request.query_params.get('month')
        if month:
            queryset = queryset.filter(month=month)

        return queryset
    
    def perform_update(self, serializer):
        calories_limit = serializer.validated_data.get('calories_limit')
        serializer.save(
            calories_limit = calories_limit
        )

