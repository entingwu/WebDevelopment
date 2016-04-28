(function()
{
    angular
        .module("MusicPlayerApp")
        .factory("SearchService", searchService);

    function searchService($http, $q, Auth, $rootScope) {
        var service = {
            getBrowseCategories: getBrowseCategories,
            getBrowseCategory: getBrowseCategory,
            getBrowseCategoryPlaylists: getBrowseCategoryPlaylists,
            getSearchResults : getSearchResults,
            getPlaylist : getPlaylist,
            getPlaylistTracks : getPlaylistTracks,
            getTracks: getTracks,//get serval tracks
            getTrack: getTrack,

            findArtistById: findArtistById,
            findArtistTopTracks : findArtistTopTracks,
            findAlbumByArtist: findAlbumByArtist,
            findAlbumById: findAlbumById,
            findTracksByAlbum : findTracksByAlbum,
            findTrackById: findTrackById
        };
        return service;

        /* 1. BROWSE CATEGORY */
        function getBrowseCategories() {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/browse/categories', {
                        headers: { 'Authorization': 'Bearer ' + response }
                    }).success(function(r) {
                        console.log('got browse categories', r);
                        deferred.resolve(r);
                    }).error(function(err) {
                        console.log('failed to get browse categories', err);
                        deferred.reject(err);
                    });
                });
            return deferred.promise;
        }

        function getBrowseCategory(categoryId) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/browse/categories/' + categoryId, {
                        headers: { 'Authorization': 'Bearer ' + response }
                    }).success(function(r) {
                        console.log('got browse category', r);
                        deferred.resolve(r);
                    }).error(function(err) {
                        console.log('failed to get browse category', err);
                        deferred.reject(err);
                    });
                });
            return deferred.promise;
        }

        function getBrowseCategoryPlaylists(categoryId) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/browse/categories/' + categoryId + '/playlists', {
                        headers: { 'Authorization': 'Bearer ' + response }
                    }).success(function(r) {
                        console.log('got browse category playlists', r);
                        deferred.resolve(r);
                    }).error(function(err) {
                        console.log('failed to get category playlists', err);
                        deferred.reject(err);
                    });
                });
            return deferred.promise;
        }

        function getSearchResults(query) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/search?type=track,playlist&q=' + encodeURIComponent(query), {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).success(function(r) {
                        console.log('got search results', r);
                        deferred.resolve(r);
                    });
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

        function getTracks(trackids) {
            var deferred = $q.defer();
            var baseUrl = 'https://api.spotify.com/v1';
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get(baseUrl + '/tracks/?ids=' + encodeURIComponent(trackids.join(',')), {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).success(function(r) {
                        console.log('got tracks', r);
                        deferred.resolve(r);
                    });
                });
            return deferred.promise;
        }

        function getTrack(trackid) {
            var deferred = $q.defer();
            $http.get('https://api.spotify.com/v1' + '/tracks/' + encodeURIComponent(trackid), {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token
                }
            }).success(function(r) {
                console.log('got track', r);
                deferred.resolve(r);
            });
            return deferred.promise;
        }

        /* 2. ARTIST : work without token */
        function findArtistById(artistid) {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/artists/' + artistid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findArtistTopTracks(artistid, country) {
            var deferred = $q.defer();
            var baseUrl = 'https://api.spotify.com/v1';
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get(baseUrl + '/artists/' + encodeURIComponent(artistid) + '/top-tracks?country=' + encodeURIComponent(country), {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).success(function(r) {
                        console.log('got artist top tracks', r);
                        deferred.resolve(r);
                    });
                });
            return deferred.promise;
        }

        /* 3. ALBUM */
        function findAlbumByArtist(artistId, country) {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/artists/' + encodeURIComponent(artistId) +
                        '/albums?country=' + encodeURIComponent(country), {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).success(function(r) {
                        console.log('got artist albums', r);
                        deferred.resolve(r);
                    });
                });
            return deferred.promise;
        }

        function findAlbumById(albumId) {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/albums/' + albumId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        /* 4. TRACK */
        function findTracksByAlbum(albumId) {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/albums/'+ albumId +'/tracks')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findTrackById(id) {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/tracks/'+ id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
