/**
 * Created by entingwu on 2/18/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("NavController", navController);

    function navController($scope, $location)
    {
        $scope.$location = $location;

        console.log($location.url());
    }
})();