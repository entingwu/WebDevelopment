"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller('UserFollowController', UserFollowController);

    function UserFollowController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.follow = follow;
        model.deleteFollowing = deleteFollowing;
        model.deleteFollower = deleteFollower;

        init();
        function init() {
            console.log("logged user: ", $rootScope.user);
            if($rootScope.user != null) {
                UserService
                    .findUserById($rootScope.user._id)
                    .then(function (user) {
                        model.user = user;
                        model.followings = user.following;
                        model.followers = user.followers;
                    });
            }
        }

        function follow() {
            UserService
                .addfollowToUser($rootScope.user._id, model.user)
                .then(function(result) {
                    console.log("Added a following to user", result);
                });
        }

        /* user1.following - user2;
           user2.follower - user1 */
        function deleteFollowing(following) {
            UserService
                .deleteFollowingFromUser(model.user._id, following.id)
                .then(function (response) {
                UserService
                    .findFollowingByUserId(model.user._id)
                    .then(function (result) {
                        model.followings = result;
                        console.log("Deleted a following", model.followings);
                    });
            });

            UserService
                .deleteFollowerFromUser(following.id, model.user._id)
                .then(function (response) {
                console.log(response);
            });
        }

        /* user1.followers - user2;
           user2.following - user1 */
        function deleteFollower(follower) {
            UserService
                .deleteFollowerFromUser(model.user._id, follower.id)
                .then(function (response) {
                UserService
                    .findFollowerByUserId(model.user._id)
                    .then(function (result) {
                        model.followers = result;
                        console.log("Deleted a follower", model.followers);
                    });
            });

            UserService
                .deleteFollowingFromUser(follower.id, model.user._id)
                .then(function (response) {
                console.log(response);
            });
        }
    }

})();
