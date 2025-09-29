from django.urls import path
from .views import item_names, ItemView, EatenItemView


urlpatterns = [
    path('item-names/', item_names, name='item-names'),
    path('item/<int:pk>/', ItemView.as_view(), name='item'),
    path('eaten-item/', EatenItemView.as_view(), name='eaten-item'),
    path('eaten-item/<str:date>/', EatenItemView.as_view(), name='eaten-items-date'),
]