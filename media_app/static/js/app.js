var app = angular.module('myApp', ['ngRoute', 'ngResource']);

// Declare app level module which depends on filters, and services
app.config(function($routeProvider) {
	$routeProvider
    .when('/', {
		templateUrl: '/static/js/partials/home.html',
		controller: 'homeController'
	})
	.otherwise({redirectTo: '/'});
});


app.factory('Images', function($resource) {
    return{
        fetchImages: function(url, callback){
            var api = $resource(url,
            {
                callback: "JSON_CALLBACK"
            },
            {
                fetch:{method:'JSONP'}
            });
            api.fetch(function(response){

                callback(response);
            });
        },
        deleteImage: function(url, callback){
            console.log(url);
            var image = $resource(url,
            {
                callback: "JSON_CALLBACK"
            },
            {
                delete: {
                    method: 'DELETE'
                }
            });
            image.delete(function(response){

                callback(response);
            });
        }
    }
});


app.controller('homeController', function($location, $scope, $http, Images) {
    var url = 'http://127.0.0.1:8000/api/v1/image/';
    var baseurl = '127.0.0.1:8000';

    Images.fetchImages(url, function(data){
        var image = data.objects;
        var images = [];
        console.log(data);
        for (i=0; i<image.length; i++){
            images.push({
                title: image[i].title,
                url: image[i].image,
                resource_uri: image[i].resource_uri
            });
        }
        $scope.images = images;
    });

    $scope.delete_image = function(resource_uri){
        var url = baseurl + resource_uri;
//        console.log(baseurl + resource_uri);
        Images.deleteImage(url, function(data){
           console.log(data);
        });
    };


    $scope.update_image = function(resource_uri){
        console.log(resource_uri);
    };

});
