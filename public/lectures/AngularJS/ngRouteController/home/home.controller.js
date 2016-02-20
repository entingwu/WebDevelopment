/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("HomeController",HomeController);//controller, function
    function HomeController($scope) {
        $scope.homehello = "Hello from HomeController"
    }
})();