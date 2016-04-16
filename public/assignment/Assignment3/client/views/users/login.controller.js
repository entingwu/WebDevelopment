(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            UserService
                .findUserByCredentials($scope.loginUser.username, $scope.loginUser.password)
                .then(function(user) {//returns user
                    if(user != null) {
                        $rootScope.user = user;
                        $location.url('/profile');
                        console.log("current login users is: ");
                        console.log($rootScope.user);
                    }
                });

            UserService
                .findAllUsers()
                .then(function(users) {
                    console.log("All registered users are:");
                    console.log(users);
                });

        }
    }
})();