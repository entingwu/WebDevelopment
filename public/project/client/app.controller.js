(function() {
    "use strict";
    angular
        .module("MusicPlayerApp",["ngRoute"])
        .controller("AppController", function($scope, $location, Auth, API) {
            function checkUser(redirectToLogin) {

            }

            $scope.isLoggedIn = (Auth.getAccessToken() != '');
            $scope.showplayer = $scope.isLoggedIn;
            $scope.showlogin = !$scope.isLoggedIn;

        });
})();
