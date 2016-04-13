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
        /* Genres & Mood
           GET :  https://api.spotify.com/v1/browse/categories */

        SearchService.getBrowseCategories()
            .then(function(data) {
                console.log("browseCategory: ");
                console.log(data);
                $scope.genresMoods = data.categories.items;
            });

    }

})();
