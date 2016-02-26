(function()
{
    angular
        .module("UserApp")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, $location, UserService)
    {
        $scope.id = $routeParams.num;
        $scope.user = UserService.findUserById($routeParams.id);

        $scope.$location = $location;
        console.log("profile controller: " + $location.url());
    }
})();