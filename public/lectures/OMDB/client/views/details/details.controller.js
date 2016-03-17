(function(){
    angular
        .module("OmdbApp")
        .controller("DetailsController", detailsController);
    /* search.view.html : <a href="#/details/{{movie.imdbID}}"> {{movie.Title}} </a>
    *  user $routeParams to get imdbID
    * */
    function detailsController($routeParams,
                               OmdbService,
                               $rootScope,
                               $location,
                               MovieService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID (imdbID)
                .then(function(response){//call back ==> promise (an object)
                    vm.data = response.data;//let details.view to use controller's data
                });

            MovieService
                .findUserLikes (imdbID)
                .then(function(response){
                    vm.movie = response.data;
                });
        }
        init();
        /* user likes movie relationship */
        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();