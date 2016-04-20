"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService, SearchService) {
        var model = this;
        model.$location = $location;
        model.update = update;
        model.follow = follow;

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
            UserService
                .updateUser($rootScope.user._id, profileUser)
                .then(function (user) {
                    $rootScope.user = user;
                    $location.url("/profile");
                    console.log("updated profile", user);
                    console.log("url", "/browsecategory/"+gm_id);
                    $location.url("/browsecategory/"+gm_id);
            });
        }

        function follow() {
            UserService
                .addfollowToUser($rootScope.user._id, model.user)
                .then(function(result) {
                console.log("successfully added a new following to current user", result);
            });
        }
    }

})();
