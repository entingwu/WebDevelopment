(function () {
    angular
        .module ("GetMoviesApp")
        .factory ("MovieService", MovieService);

    function MovieService ($http) {
        var api = {
            getAllMovies: getAllMovies,
            getMovieById: getMovieById
        };
        return api;

        function getAllMovies () {
            /* 1. $http.get(url) : the data comes from server
            *  2. returns the promise to the init() function in GetMoviesController in client.app.js*/
            return $http.get ("/api/lectures/server/omdb/getmovies/movie");
        }

        /*function getAllMovies (callback) {
            //callback : sequence call
            $http.get("/api/lectures/server/omdb/getmovies/movie").success(callback);
        }*/

        /*  1. returns the promise to the getMovieById(id) in GetMoviesController in client.app.js*/
        function getMovieById (id) {
            return $http.get ("/api/lectures/server/omdb/getmovies/movie/" + id);
        }
    }
})();
