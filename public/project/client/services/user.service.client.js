(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .factory("UserService", userService);

    function userService($http, $q, Auth, $rootScope)
    {
        var service = {
            //getMe : getMe,
            changePlaylistDetails : changePlaylistDetails,
            getPlaylists : getPlaylists,
            getPlaylist : getPlaylist,
            getPlaylistTracks : getPlaylistTracks,

            /* User */
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findUserByUsername : findUserByUsername,
            findUserById : findUserById,

            /* Song */
            addSongToUser : addSongToUser,
            findSongsByUserId : findSongsByUserId,
            deleteSongFromUser : deleteSongFromUser,

            /* Artist */
            addArtistToUser : addArtistToUser,
            findArtistsByUserId : findArtistsByUserId,
            deleteArtistFromUser : deleteArtistFromUser,

            /* Album */
            addAlbumToUser : addAlbumToUser,
            findAlbumsByUserId : findAlbumsByUserId,
            deleteAlbumFromUser : deleteAlbumFromUser,

            /* Follower */
            addfollowToUser: addfollowToUser,
            findFollowingByUserId : findFollowingByUserId,
            findFollowerByUserId : findFollowerByUserId,
            deleteFollowingFromUser : deleteFollowingFromUser,
            deleteFollowerFromUser : deleteFollowerFromUser
        };

        return service;

        /*function getMe() {
            Auth.getAccessToken()
                .then(function(response) {
                    var token = response;
                    var deferred = $q.defer();
                    console.log("user.service.client: ");
                    $http.get('https://api.spotify.com/v1' + '/users/jmperezperez', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).success(function(r) {
                        console.log('got userinfo', r);
                        deferred.resolve(r);
                    }).error(function(err) {
                        console.log('failed to get userinfo', err);
                        deferred.reject(err);
                    });
                    return deferred.promise;
                });

        }*/

        function changePlaylistDetails(username, playlist, options) {
            var deferred = $q.defer();
            $http.put('https://api.spotify.com/v1' + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), options, {
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
            }).success(function(r) {
                console.log('got response after changing playlist details', r);
                deferred.resolve(r);
            });
            return deferred.promise;
        }

        function getPlaylists(username) {
            var limit = 50;
            var deferred = $q.defer();
            var playlists = [];

            $http.get('https://api.spotify.com/v1' + '/users/' + encodeURIComponent(username) + '/playlists', {
                params: {
                    limit: limit
                },
                headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                }
            }).success(function(r) {
                playlists = playlists.concat(r.items);

                var promises = [],
                    total = r.total,
                    offset = r.offset;

                while (total > limit + offset) {
                    promises.push(
                        $http.get('https://api.spotify.com/v1' + '/users/' + encodeURIComponent(username) + '/playlists', {
                            params: {
                                limit: limit,
                                offset: offset + limit
                            },
                            headers: {
                                'Authorization': 'Bearer ' + Auth.getAccessToken()
                            }
                        })
                    );
                    offset += limit;
                }

                $q.all(promises).then(function(results) {
                    results.forEach(function(result) {
                        playlists = playlists.concat(result.data.items);
                    });
                    console.log('got playlists', playlists);
                    deferred.resolve(playlists);
                });

            }).error(function(data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getPlaylist(username, playlist) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    var token = response;
                    $http.get('https://api.spotify.com/v1' + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).success(function(r) {
                        console.log('got playlists', r);
                        deferred.resolve(r);
                    });
                });
            return deferred.promise;
        }

        function getPlaylistTracks(username, playlist) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    var token = response;
                    $http.get('https://api.spotify.com/v1' + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist) + '/tracks', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).success(function(r) {
                        console.log('got playlist tracks', r);
                        deferred.resolve(r);
                    });
                });
            return deferred.promise;
        }

        /* USER */
        function findUserById(id)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user?username=' + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password)
        {
            console.log("find user by username and password");
            var deferred = $q.defer();
            $http
                .get('/api/project/user?username=' + username + '&' + 'password=' + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers()
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user)
        {
            var deferred = $q.defer();
            $http
                .post('/api/project/user', user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(id)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(id, user)
        {
            var deferred = $q.defer();
            $http
                .put('/api/project/user/' + id, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addSongToUser(userId, song)
        {
            var deferred = $q.defer();
            $http
                .post('/api/project/user/'+ userId + '/song', song)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findSongsByUserId(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/song')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteSongFromUser(userId, songId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/song/' + songId)
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

        function findAlbumsByUserId(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/album')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteAlbumFromUser(userId, albumId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/album/' + albumId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addfollowToUser(userId, follow)
        {
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

        function findFollowerByUserId(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/' + userId + '/follower')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFollowingFromUser(userId, followId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/following/' + followId)
                .success(function(response) {
                    console.log("deleted a following from user");
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFollowerFromUser(userId, followId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/' + userId + '/follower/' + followId)
                .success(function(response) {
                    console.log("deleted a follower from user");
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
