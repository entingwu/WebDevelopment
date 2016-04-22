(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.login = login;

        function login(loginUser) {
            console.log('do login...');
            UserService
                .loginUser(loginUser)
                .then(
                    function(result) {
                        if(result != null) {
                            $rootScope.user = result.data;
                            $scope.isLoggedIn = true;
                            $scope.message = "success";
                            $('#loginModal').modal('hide');

                            if($rootScope.user.roles.indexOf('admin') >= 0) {
                                $location.url("/admin");
                            }
                            $location.url("/profile");
                        }else {
                            $scope.message = "error";
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );

        }
    }
})();
