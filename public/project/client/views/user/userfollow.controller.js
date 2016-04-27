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
                        console.log(model.user);
                        model.followings = user.following;
                        model.followers = user.followers;
                        model.followingIds = [];
                        for(var i = 0; i<model.followings.length; i++) {
                            model.followingIds.push(model.followings[i]._id);
                        }
                        console.log(model.followingIds);
                    });

                UserService
                     .findAllUsers()
                    .then(function(users) {
                        model.users = users;
                        for(var i = 0; i<model.users.length; i++) {
                            if(model.users[i]._id == $rootScope.user._id) {
                                model.users.splice(i, 1);
                            }
                        }
                    });
            }
        }

        function follow(follow) {
            UserService
                .addFollowToUser($rootScope.user._id, follow)
                .then(init);
        }

        /* user1.following - user2;
           user2.follower - user1 */
        function deleteFollowing(following) {
            console.log(following._id);
            UserService
                .deleteFollowingFromUser(model.user._id, following._id)
                .then(function (response) {
                UserService
                    .findFollowingByUserId(model.user._id)
                    .then(init);
            });

            UserService
                .deleteFollowerFromUser(following._id, model.user._id)
                .then(init);
        }

        /* user1.followers - user2;
           user2.following - user1 */
        function deleteFollower(follower) {
            UserService
                .deleteFollowerFromUser(model.user._id, follower._id)
                .then(function (response) {
                UserService
                    .findFollowerByUserId(model.user._id)
                    .then(init);
            });

            UserService
                .deleteFollowingFromUser(follower._id, model.user._id)
                .then(init);
        }
    }

})();
