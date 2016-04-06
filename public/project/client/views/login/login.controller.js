(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('LoginController', function($scope, Auth) {
        $scope.isLoggedIn = false;

        $scope.login = function() {
            console.log('do login...');
            Auth.openLogin();
        }
    });

})();
