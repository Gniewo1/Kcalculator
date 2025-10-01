from django.urls import path, include
from .views import item_names, ItemView, EatenItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'eaten-items', EatenItemViewSet, basename='eatenitem')


urlpatterns = [
    path('item-names/', item_names, name='item-names'),
    path('item/<int:pk>/', ItemView.as_view(), name='item'),
    # path('eaten-item/', EatenItemView.as_view(), name='eaten-item'),
    # path('eaten-item/<str:date>/', EatenItemView.as_view(), name='eaten-items-date'),
    # path('eaten-items/<int:pk>/edit/', EatenItemView.as_view(), name='eaten-item-edit'),
    path('', include(router.urls)),
]