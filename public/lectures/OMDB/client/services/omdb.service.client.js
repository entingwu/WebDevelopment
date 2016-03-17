(function(){
    angular
        .module("OmdbApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        /* return promise to controller */
        function findMovieByImdbID(imdbID) {
            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?i="+imdbID+"&callback=JSON_CALLBACK");
        }

        function searchMovieByTitle(title) {
            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }
    }
})();
