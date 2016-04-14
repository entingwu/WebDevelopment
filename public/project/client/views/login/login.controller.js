(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $location, UserService, $scope, Auth) {
        var model = this;
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.login = function() {
            console.log('do login...');
            UserService
                .findUserByUsernameAndPassword($scope.loginUser.username, $scope.loginUser.password)
                .then(function(user) {
                    if(user != null) {
                        model.loginDisplayMessage = "success";
                        $rootScope.loginMessage = true;

                        /*login as Admin*/
                        if (user.username == "admin" && user.password == "admin") {
                            $rootScope.loginAsAdmin = true;
                        }

                        /*redirect to previous location after login, or redirect to profile page*/
                        if(model.$location != null) {
                            $location.url(model.$location);
                        }else {
                            $location.url("/profile");
                        }
                        console.log("current login user is: ");
                        console.log($rootScope.user);
                    }else {
                        model.loginDisplayMessage = "error";
                    }
                });


        };
    }
})();
