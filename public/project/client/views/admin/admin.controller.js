"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.addUser = addUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        $scope.reverseSort = true;

        function init() {
            if($rootScope.user != null) {
                UserService
                    .findUserById($rootScope.user._id)
                    .then(function (user) {
                        model.currentUser = user;
                });
            }
            UserService
                .findAllUsers()
                .then(
                    function(response) {
                        model.users = response;
                        console.log("found all users", model.users);
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
        init();

        function addUser(newUser) {
            var roleText = model.user.roles.toString();
            newUser.roles = roleText.split(",");
            console.log(newUser);
            UserService
                .createUser(newUser)
                .then(init);
        }

        function selectUser(user) {
            document.getElementById('username').value = user.username;
            document.getElementById('password').value = user.password;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('roles').value = user.roles;
            model.currentUser = user;
            console.log("selected user", model.currentUser);
        }

        function updateUser(user) {
            if(model.currentUser != null) {
                console.log("start update:", user);
                var roleText = user.roles.toString();
                if(roleText != "" && roleText != null) {
                    user.roles = roleText.split(",");
                }
                console.log(user);
                UserService
                    .updateUserByAdmin(model.currentUser._id, user)
                    .then(init);
            }
        }

        function deleteUser(user) {
            UserService
                .deleteUserById(user._id)
                .then(init);
        }
    }
})();