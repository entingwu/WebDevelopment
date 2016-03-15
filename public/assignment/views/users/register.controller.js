/* Implement an event handler register()
 * a.	Use the UserService to create the new user
 * i.	Store the new user object in the $rootScope
 * ii.	Use the $location service to navigate to the profile view
 * */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        /* Event Handlers Declarations */
        $scope.register = register;

        function register() {
            UserService.createUser($scope.registerUser, function(user) {//callback function of createUser return newUser as users
                $rootScope.user = user;
                $location.url("/profile");
                console.log("current register users is ");
                console.log($rootScope.user);
            });

            UserService.findAllUsers(function(users){
                console.log("All registered users are: ");
                console.log(users);
            });
        }
    }

})();