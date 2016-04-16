(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $location, UserService, $scope) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.login = login;

        function login(loginUser) {
            console.log('do login...');
            UserService
                .findUserByUsernameAndPassword(loginUser.username, loginUser.password)
                .then(function(user) {
                    if(user != null) {
                        $rootScope.user = user;
                        $scope.message = "success";
                        $rootScope.loginMessage = true;
                        $('#loginModal').modal('hide');

                        /*login as Admin*/
                        if (user.username == "admin" && user.password == "admin") {
                            $rootScope.loginAsAdmin = true;
                        }

                        /*redirect to previous location after login, or redirect to profile page*/
                        if($scope.$location != null) {
                            $location.url($scope.$location);
                        }else {
                            $location.url("/profile");
                        }
                        $location.url("/profile");
                        console.log("current login user is: ");
                        console.log($rootScope.user);
                    }else {
                        $scope.message = "error";
                    }
                });
        }
    }
})();
