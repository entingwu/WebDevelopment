(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {//angular q
        var service = {
            loginUser : loginUser,
            logoutUser : logoutUser,
            register : register,
            updateUserById : updateUserById,

            findUserByUsername : findUserByUsername,
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,

            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUserByAdmin : updateUserByAdmin,
            getCurrentUser : getCurrentUser
        };
        return service;

        function loginUser(user) {
            var deferred = $q.defer();
            $http
                .post('/api/assignment5/login', user)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function logoutUser() {
            var deferred = $q.defer();
            $http
                .post('/api/assignment5/logout')
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserById(userId, user) {
            console.log("update in client:", user);
            var deferred = $q.defer();
            $http
                .put('/api/assignment5/user/' + userId, user)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //REGISTER : app.post('/api/assignment/register',auth,   register);
        function register(user) {
            var deferred = $q.defer();
            $http
                .post('/api/assignment5/register', user)
                .then(function(response) {
                    console.log("register user from client:",response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //ADMIN : return the request
        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post('/api/assignment5/admin/user', user)
                .success(function(response) {
                    console.log("create user from client:" + response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete('/api/assignment5/admin/user/' + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //PROFILE: app.put('/api/assignment/admin/user/:userId',   auth,    updateUser);//9
        function updateUserByAdmin(userId, user) {
            var deferred = $q.defer();
            $http
                .put('/api/assignment5/admin/user/' + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //app.get('/api/assignment/admin/user/:username', auth,    getUserByUsername);
        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http
                .get('/api/assignment5/admin/user?username=' + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //app.get('/api/assignment/admin/user/:userId',   auth,    getUserById);//7
        function findUserById(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/assignment5/admin/user/' + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //app.post('/api/assignment/user', passport.authenticate('local'), login);//1. login
        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http
                .post('/api/assignment5/user?username=' + username + '&' +'password=' + password)
                .then(function(response) {
                    console.log("login in client: "+ username + "," + password);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //app.get('/api/assignment/admin/user',           auth,    getAllUsers);//6
        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get('/api/assignment5/admin/user')
                .success(function(response) {
                    console.log("find all users from client :", response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getCurrentUser() {
            var deferred = $q.defer();
            $http
                .get('/api/assignment5/loggedin')
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
})();
