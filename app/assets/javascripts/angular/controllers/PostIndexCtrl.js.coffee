@blog.controller 'PostIndexCtrl', ['$scope', '$location', '$http', ($scope, $location, $http) ->
  $scope.posts = []
  $http.get('./posts.json').success((data) ->
    $scope.posts = data
  )
]
