(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.update = update;

        function update(profileUser) {
            UserService
                .updateUserById($rootScope.user._id, profileUser)
                .then(
                    function(user) {
                        console.log("update profile user: ", user);
                        $rootScope.user = user;
                        $location.url("/profile");
                        $scope.alert = "Updated successfully";
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        model.user = $rootScope.user;
        if(!model.user) {
            $location.url("/home");
        }
    }
})();