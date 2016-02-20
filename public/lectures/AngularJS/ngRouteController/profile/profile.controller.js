/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileController",ProfileController);//controller, function
    function ProfileController($scope) {
        $scope.profilehello = "Hello from ProfileController"
    }
})();