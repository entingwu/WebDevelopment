"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function(response) {
                        model.users = response;
                    },
                    function(err) {
                        model.error = err;
                    }
                );
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
                var roleText = user.roles.toString();
                if(roleText != "" && roleText != null) {
                    var roleArray = roleText.split(",");
                    user.roles = roleArray;
                }
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

        $scope.order = order;

        function order(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            model.users = orderBy(model.users, predicate, $scope.reverse);
        }

        $scope.order('username', true);
    }
})();