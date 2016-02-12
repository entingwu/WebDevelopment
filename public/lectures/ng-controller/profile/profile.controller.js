/**
 * Created by entingwu on 2/11/16.
 */

(function(){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope) {
        $scope.profileHello = "Hello from ProfileController"
    }
})();