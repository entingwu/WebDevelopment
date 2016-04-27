"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService, SearchService) {
        var model = this;
        model.$location = $location;
        model.update = update;

        if ($rootScope.user != null) {
            UserService
                .findUserById($rootScope.user._id)
                .then(function (user) {
                    model.user = user;
                    $scope.user = user;
                    console.log(user);
            });
        }

        SearchService.getBrowseCategories()
            .then(function(data) {
                $scope.genresMoods = data.categories.items;
            });

        function update(profileUser) {
            var gm_id = profileUser.genres;
            if(profileUser.password != profileUser.password2) {
                $scope.alert = "Password not match";
                return;
            }
            UserService
                .updateUserById($rootScope.user._id, profileUser)
                .then(
                    function (user) {
                        $rootScope.user = user;
                        model.user = $rootScope.user;
                        console.log("updated profile:", $rootScope.user);
                        $location.url("/profile");
                        console.log("url", "/browsecategory/"+gm_id);
                        $location.url("/browsecategory/"+gm_id);
                    },
                    function(err) {
                        $scope.alert = err;
                    }
                );
        }
    }

})();
