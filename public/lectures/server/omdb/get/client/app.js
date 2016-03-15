(function () {
    angular
        .module("GetMoviesApp", [])
        .controller("GetMoviesController", GetMoviesController);

    function GetMoviesController ($scope, MovieService) {

        function init () {
            //getAllMovies : sequence promises from MovieService in movie.service.client.js
            MovieService
                .getAllMovies()
                .then(renderAllMovies, renderError);
        }
        init();

        $scope.getMovieById = getMovieById;

        function getMovieById (id) {
            //use then to register the function renderMovie(success) and renderError(error) which want to call
            MovieService
                .getMovieById(id)
                .then(renderMovie, renderError);
        }

        function renderAllMovies (response) {
            $scope.movies = response.data;
        }

        function renderMovie (response) {
            $scope.movie = response.data;
        }

        function renderError (error) {
            $scope.error = "Unable to render movie";
        }
    }
})();