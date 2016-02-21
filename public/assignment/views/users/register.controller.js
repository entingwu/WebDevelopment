/**
 * Created by entingwu on 2/16/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;

        /* Event Handlers Declarations */
        $scope.register = register;

        /* Implement an event handler register()
        * a.	Use the UserService to create the new user
        * i.	Store the new user object in the $rootScope
        * ii.	Use the $location service to navigate to the profile view
        * */
        function register() {
            UserService.createUser($scope.registerUser, function(user) {
                $rootScope.user = user;
                $location.url("/profile");
                console.log("current register user is ");
                console.log($rootScope.user);
            });

            UserService.findAllUsers(function(users){
                console.log("All registered users are: ")
                console.log(users);
            });
        }
    }

})();