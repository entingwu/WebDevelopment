(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = function() {
            UserService
                .updateUser($rootScope.user._id, $scope.profileUser)
                .then(function(user) {
                    $rootScope.user = user;
                    $location.url("/profile");
                    console.log(user);
                });
        };

        $scope.user = UserService.getUser();
        if(!$scope.user) {
            $location.url("/home");
        }
    }
})();