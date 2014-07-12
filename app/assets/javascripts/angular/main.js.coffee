@blog = angular.module('blog', ['ngRoute'])

@blog.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.
    when('/posts', {
      templateUrl: '../templates/posts/index.html',
      controller: 'PostIndexCtrl'
    }).
    otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    })
])
