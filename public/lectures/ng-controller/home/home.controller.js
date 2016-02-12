/**
 * Created by entingwu on 2/11/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("HomeController", HomeController);
    function HomeController($scope) {
        $scope.homeHello = "Hello from HomeController"
    }
})();