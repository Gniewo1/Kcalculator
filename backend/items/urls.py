from django.urls import path, include
from .views import item_names, ItemView, EatenItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'eaten-items', EatenItemViewSet, basename='eatenitem')


urlpatterns = [
    path('item-names/', item_names, name='item-names'),
    path('item/<int:pk>/', ItemView.as_view(), name='item'),
    path('', include(router.urls)),
]