/**
 * Implement the login controller
 1.	LoginController() should inject the UserService service you implemented elsewhere
 2.	Implement an event handler login()
 3.	Use the UserService to lookup the user
 4.	If the user exists
 i.	Store the user object in the $rootScope
 ii.	Use the $location service to navigate to the profile view
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            /* findUserByCredentials(username, passoword, callback) */
            UserService.findUserByCredentials($scope.loginUser.username, $scope.loginUser.password, function(user){
                if (user != null) {//callback function return users
                    UserService.setUser(user);
                    $location.path("/profile");
                    console.log("current login users is: ");
                    console.log($rootScope.user);
                }
            });

            /* findAllUsers(callback) */
            UserService.findAllUsers(function(users){
                console.log("All registered users are:");
                console.log(users);
            });
        }
    }
})();