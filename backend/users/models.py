from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    

class CaloriesLimit(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    month = models.DateField(help_text="First day of the month, e.g. 2025-10-01")
    calories_limit = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user} - {self.month.strftime('%B %Y')}"