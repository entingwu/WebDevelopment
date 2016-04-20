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
        model.saveViewUserId = saveViewUserId;

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

        function saveViewUserId(userId) {
            $rootScope.viewUserId = userId;
        }

        /* user1.following - user2;
           user2.follower - user1 */
        function deleteFollowing(following) {
            UserService
                .deleteFollowingFromUser(model.user._id, following.id)
                .then(function (response) {
                UserService
                    .findFollowingByUserId(model.user._id)
                    .then(init);
            });

            UserService
                .deleteFollowerFromUser(following.id, model.user._id)
                .then(init);
        }

        /* user1.followers - user2;
           user2.following - user1 */
        function deleteFollower(follower) {
            UserService
                .deleteFollowerFromUser(model.user._id, follower.id)
                .then(function (response) {
                UserService
                    .findFollowerByUserId(model.user._id)
                    .then(init);
            });

            UserService
                .deleteFollowingFromUser(follower.id, model.user._id)
                .then(init);
        }
    }

})();
