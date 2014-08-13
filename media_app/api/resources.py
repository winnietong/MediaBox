from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from media_app.models import MyImage
from authorization import UserObjectsOnlyAuthorization

class MyImageResource(ModelResource):
    class Meta:
        queryset = MyImage.objects.all()
        allowed_methods = ['get', 'post', 'put', 'delete']
        always_return_data = True
        resource_name = "image"
        authorization = UserObjectsOnlyAuthorization()
