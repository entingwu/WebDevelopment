(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.$location = $location;
        model.login = login;

        function login(loginUser) {//user from ng-model
            UserService
                .loginUser(loginUser)
                .then(
                    function(user) {//get from deserialize
                        if(user != null) {
                            $rootScope.user = user.data;
                            $location.url('/profile');
                            console.log("current login users is: ");
                            console.log($rootScope.user);
                        }else {
                            $scope.error = "Invalid Password or Username";
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );

        }
    }
})();