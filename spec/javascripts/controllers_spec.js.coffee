describe "Post controllers", ->
  beforeEach module("post")

  describe "PostIndexCtrl", ->
    it "should set posts to an empty array", inject(($controller) ->
      scope = {}
      ctrl = $controller("PostIndexCtrl",
        $scope: scope
      )
      expect(scope.posts.length).toBe 0
    )
