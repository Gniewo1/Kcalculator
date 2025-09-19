from django.urls import path
from .views import item_names, ItemsView


urlpatterns = [
    path('item-names/', item_names, name='item-names'),
    path('item/<int:pk>', ItemsView.as_view(), name='item'),
]