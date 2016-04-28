"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, SearchService) {
        var model = this;
        /* Genres & Mood
         GET :  https://api.spotify.com/v1/browse/categories */
        SearchService.getBrowseCategories()
            .then(function(data) {
                console.log("browseCategory: ");
                console.log(data);
                model.genresMoods = data.categories.items;
            });

    }

})();
