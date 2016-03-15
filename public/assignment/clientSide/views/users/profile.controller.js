/**
 * Implement the profile controller
 1.	Retrieve the currently logged in user from the $rootScope
 2.	Update the view form with the current user
 3.	Implement an event handler update()
 4.	Use the UserService to update the current user
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.user = UserService.getUser();
        if(!$scope.user) {
            $location.url("/home");
        }

        /* updateUser(userId, users, callback) */
        function update() {
            UserService.updateUser($rootScope.user._id, $scope.profileUser, function(user) {
                $rootScope.user = user;//update $rootScope.users with the users returned from users.services
                $location.url("/profile");
                console.log("profile updated");
                console.log(user);
            });
        }
    }
})();