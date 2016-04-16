(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.register = register;

        function register() {
            if($scope.registerUser.username != null && $scope.registerUser.password != null) {
                UserService
                    .createUser($scope.registerUser)
                    .then(function(newUser) {//createUser returns promise
                        $rootScope.user = newUser;
                        $location.url("/profile");
                    });
            }
            UserService
                .findAllUsers()
                .then(function(users) {
                    console.log("All registered users are: ");
                    console.log(users);
                });
        }
    }
})();