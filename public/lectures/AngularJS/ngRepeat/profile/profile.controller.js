/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("profile.controller", ProfileController);
    function ProfileController($scope) {
        $scope.profileHello = "Hello from ProfileController"
    }
})();