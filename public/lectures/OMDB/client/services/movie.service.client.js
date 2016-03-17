(function(){
    angular
        .module("OmdbApp")
        .factory("MovieService", movieService);
    /* user like movie : store in two places
    *  1. userLikesMovie(userId, movie) : details.controller pass the user_id and movie
    *  2. findUserLikes(imdbID)*/
    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (imdbID) {
            return $http.get("/api/project/movie/"+imdbID+"/user");
        }
        /* userId likes movie object */
        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);
        }
    }
})();