/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("AdminController",AdminController);
    function AdminController($scope) {
        $scope.adminhello = "Hello from AdminController"
    }
})();