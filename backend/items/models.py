from django.db import models
from users.models import CustomUser


class Item(models.Model):
    name = models.CharField(max_length=100)
    cal_in_gram = models.DecimalField(max_digits=6, decimal_places=4, blank=True, null=True)  
    cal_in_portion = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name
    

class EatenItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    portion = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    grams = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    calories = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField()

# class CaloriesLimit(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


    