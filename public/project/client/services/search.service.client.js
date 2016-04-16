(function()
{
    angular
        .module("MusicPlayerApp")
        .factory("SearchService", searchService);

    function searchService($http, $q, Auth, $rootScope)
    {
        var service = {
            getBrowseCategories: getBrowseCategories,
            getBrowseCategory: getBrowseCategory,
            getBrowseCategoryPlaylists: getBrowseCategoryPlaylists,
            getSearchResults : getSearchResults,
            getTrack: getTrack,

            findArtistByName: findArtistByName,
            findArtistById: findArtistById,
            findAlbumByArtist: findAlbumByArtist,
            findAlbumByName: findAlbumByName,
            findAlbumById: findAlbumById,
            findSongsByAlbum: findSongsByAlbum,
            findSongByName: findSongByName,
            findSongById: findSongById
        };
        return service;

        function getBrowseCategories() {
            var deferred = $q.defer();
            Auth.getAccessToken()
                .then(function(response) {
                    $rootScope.token = response;
                    $http.get('https://api.spotify.com/v1' + '/browse/categories', {
                        headers: { 'Authorization': 'Bearer ' + $rootScope.token }
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
                        headers: { 'Authorization': 'Bearer ' + $rootScope.token }
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
                        headers: { 'Authorization': 'Bearer ' + $rootScope.token }
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

        /* SEARCH: work without token */
        function findArtistByName(name)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/search?q='+ name + '&type=artist&limit=' + 9)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findArtistById(id)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/artists/' + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAlbumByArtist(id)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/artists/' + id + '/albums')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAlbumByName(name)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/search?q='+ name + '&type=album&limit=' + 9)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAlbumById(id)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/albums/' + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findSongsByAlbum(id)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/albums/'+ id +'/tracks')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findSongByName(name)
        {
            var deferred = $q.defer();
            $http
                .get('https://api.spotify.com/v1/search?q='+ name + '&type=track&limit=' + 10)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findSongById(id)
        {
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
