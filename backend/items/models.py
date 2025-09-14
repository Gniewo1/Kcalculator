from django.db import models



class Item(models.Model):
    name = models.CharField(max_length=100)
    cal_in_grams = models.DecimalField(max_digits=6, decimal_places=2)  ### calories in 100g
    cal_in_portion = models.DecimalField(max_digits=6, decimal_places=2, default=None)

    def __str__(self):
        return self.name
    

