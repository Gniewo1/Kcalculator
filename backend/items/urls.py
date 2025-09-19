from django.urls import path
from .views import item_names


urlpatterns = [
    path('item-names/', item_names, name='item-names'),
]