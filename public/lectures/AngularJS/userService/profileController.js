/**
 * Created by entingwu on 2/18/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, UserService)
    {
        $scope.id = $routeParams.id;
        $scope.user = UserService.findUserById($routeParams.id);//as a parameter to retrieve one user
    }
})();