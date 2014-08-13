from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    image = models.ImageField(upload_to='profile_images', blank=True, null=True)


class MyImage(models.Model):
    user = models.ForeignKey(User, related_name='my_image', blank=True, null=True)
    image = models.ImageField(upload_to='myimage_images', blank=True, null=True)
    title = models.CharField(max_length=100, null=True)