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
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            //findUserByUsernameAndPassword(username, passoword, callback)
            UserService.findUserByUsernameAndPassword($scope.loginUser.username, $scope.loginUser.password, function(user){
                if (user != null) {
                    $rootScope.user = user;
                    $location.url("/profile");
                    console.log("current login user is: ");
                    console.log($rootScope.user);
                }
            });

            //findAllUsers(callback)
            UserService.findAllUsers(function(users){
                console.log("All registered users are:");
                console.log(users);
            });
        }
    }
})();