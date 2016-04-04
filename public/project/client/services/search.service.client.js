(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .factory("SearchService", searchService);

    function searchService($http, $q, UserService) {
        var baseUrl = "https://api.spotify.com/v1";
        var service = {
            getFeaturedPlaylists : getFeaturedPlaylists,
            getBrowseCategories : getBrowseCategories,
            getNewReleases : getNewReleases
        };
        return service;

        /* GET : https://api.spotify.com/v1/browse/featured-playlists */
        function getFeaturedPlaylists(country, timestamp) {
            var deferred = q.defer();
            $http
                .get(baseUrl + '/browse/featured-playlists?country=' + encodeURIComponent(country) +
                    '&' + 'timestamp' + encodeURIComponent(timestamp), {
                    headers: {
                        'Authorization' : 'Bearer' + UserService.getAccessToken()
                    }
                })
                .success(function(data) {
                    console.log('got featured playlists results', data);
                    deferred.resolve(data);
                });
            return deferred.promise;
        }



    }

})();
