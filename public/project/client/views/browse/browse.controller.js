(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller("BrowseController", BrowseController);

    function BrowseController($scope, SearchService, Auth) {

        function isoTime(date) {
            var iso = date.getUTCFullYear() +
                '-' + standard( date.getUTCMonth() + 1 ) +
                '-' + standard( date.getUTCDate() ) +
                'T' + standard( date.getHours() ) +
                ':' + standard( 0 ) +
                ':' + standard( 0 );
            return iso;
        }

        function standard(num) {
            return num < 10? '0' + num : num;
        }

        var currentDate = isoTime(new Date());

        /* GET : https://api.spotify.com/v1/browse/featured-playlists */
        SearchService.getFeaturedPlaylists(Auth.getUserCountry(), currentDate)
            .then(function(data) {
                $scope.featuredPlaylists = data.playlists.items;
                $scope.message = data.message;
            });

        /* Genres & Mood
           GET :  https://api.spotify.com/v1/browse/categories */
        SearchService.getBrowseCategories()
            .then(function(data) {
                $scope.genresMoods = data.categories.items;
            });

    }

})();
