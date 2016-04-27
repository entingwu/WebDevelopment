(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .factory("UserService", userService);

    function userService($http, $q) {
        var service = {
            /* User */
            loginUser : loginUser,
            logoutUser : logoutUser,
            getCurrentUser : getCurrentUser,
            register : register,
            updateUserById : updateUserById,

            /* Admin */
            findAllUsers : findAllUsers,
            createUser : createUser,
            updateUserByAdmin : updateUserByAdmin,
            deleteUserById : deleteUserById,

            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findUserByUsername : findUserByUsername,
            findUserById : findUserById,

            /* Track */
            addTrackToUser : addTrackToUser,
            findTracksByUserId : findTracksByUserId,
            deleteTrackFromUser : deleteTrackFromUser,

            /* Artist */
            addArtistToUser : addArtistToUser,
            findArtistsByUserId : findArtistsByUserId,
            deleteArtistFromUser : deleteArtistFromUser,

            /* Album */
            addAlbumToUser : addAlbumToUser,
            findAlbumsByUserId : findAlbumsByUserId,
            deleteAlbumFromUser : deleteAlbumFromUser,

            /* Follower */
            addFollowToUser: addFollowToUser,
            findFollowingByUserId : findFollowingByUserId,
            findFollowerByUserId : findFollowerByUserId,
            deleteFollowingFromUser : deleteFollowingFromUser,
            deleteFollowerFromUser : deleteFollowerFromUser
        };
        return service;

        /* USER */
        function loginUser(user) {
            var deferred = $q.defer();
            $http
                .post('/api/project/login', user)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getCurrentUser() {
            var deferred = $q.defer();
            $http
                .get('/api/project/loggedin')
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function logoutUser() {
            var deferred = $q.defer();
            $http
                .post('/api/project/logout')
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();
            $http
                .post('/api/project/register', user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserById(userId, user) {
            var deferred = $q.defer();
            $http
                .put('/api/project/user/' + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user?username=' + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user?username=' + username + '&' + 'password=' + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        /* Admin */
        function findAllUsers() {
            var deferred = $q.defer();
            console.log("client");
            $http
                .get('/api/project/admin/user')
                .success(function(response) {
                    console.log("find all users from client :", response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post('/api/project/admin/user', user)
                .success(function(response) {
                    console.log("create user from client:" + response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserByAdmin(userId, user) {//admin
            var deferred = $q.defer();
            $http
                .put('/api/project/admin/user/' + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete('/api/project/admin/user/' + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        /* TRACK */
        function addTrackToUser(userId, track) {
            var deferred = $q.defer();
            $http
                .post('/api/project/user/'+ userId + '/song', track)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteTrackFromUser(userId, songId) {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/song/' + songId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findTracksByUserId(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/song')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addArtistToUser(userId, artist)
        {
            var deferred = $q.defer();
            $http
                .post('/api/project/user/'+ userId + '/artist', artist)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findArtistsByUserId(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/artist')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteArtistFromUser(userId, artistId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/artist/' + artistId)
                .success(function(response) {
                    console.log("deleted artist from user");
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addAlbumToUser(userId, album)
        {
            var deferred = $q.defer();
            $http
                .post('/api/project/user/'+ userId + '/album', album)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAlbumsByUserId(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/album')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteAlbumFromUser(userId, albumId) {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/album/' + albumId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addFollowToUser(userId, follow) {
            var deferred = $q.defer();
            $http
                .post('/api/project/user/'+ userId + '/following', follow)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFollowingByUserId(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/following')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFollowerByUserId(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/follower')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFollowingFromUser(userId, followId) {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/following/' + followId)
                .success(function(response) {
                    console.log("deleted a following from user", response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFollowerFromUser(userId, followId) {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/follower/' + followId)
                .success(function(response) {
                    console.log("deleted a follower from user", response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
})();
