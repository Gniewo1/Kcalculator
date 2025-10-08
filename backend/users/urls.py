from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, AuthView, CaloriesLimitViewSet
from knox import views as knox_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'calories-limit', CaloriesLimitViewSet, basename='calorieslimit')

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('user/', UserAPI.as_view(), name='user'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('check-auth/', AuthView.as_view(), name='check-auth'),
    path('', include(router.urls)),
]
