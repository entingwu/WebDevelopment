(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.register = register;

        function register(registerUser) {
            if(registerUser == null || registerUser.username == null || registerUser.password == null) {
                $scope.alert = "Please fill out the forms.";
                return;
            }
            if(registerUser.password != registerUser.password2) {
                $scope.alert = "Password not match";
                return;
            }

            UserService
                .register(registerUser)
                .then(
                    function(response) {//createUser returns promise
                        var newUser = response.data;
                        if(newUser.username != null) {
                            $rootScope.user = newUser;
                            $location.url("/profile");
                        }else {
                            //return null : when the username already exist
                            $scope.alert = "User exists";
                        }
                    },
                    function(err) {
                        $scope.alert = err;
                    }
                );
        }
    }
})();