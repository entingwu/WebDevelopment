"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;

        function init() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    model.users = response;
                });
        }
        init();

        model.addUser = addUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function addUser(newUser) {
            var roleText = model.user.roles.toString();
            newUser.roles = roleText.split(",");
            UserService
                .createUser(newUser)
                .then(init);
        }

        function selectUser(user) {
            document.getElementById('username').value = user.username;
            document.getElementById('password').value = user.password;
            document.getElementById('roles').value = user.roles;
            model.currentUser = user;
            console.log("selected user");
        }

        function updateUser(user) {
            if(model.currentUser != null) {
                console.log("start updating:");
                console.log(user);
                UserService
                    .updateUserById(model.currentUser._id, user)
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