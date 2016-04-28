(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('BrowseCategoryController', BrowseCategoryController);

    function BrowseCategoryController($scope, SearchService, $routeParams) {
        var model = this;
        model.categoryname = '';
        SearchService
            .getBrowseCategory($routeParams.categoryid)
            .then(function(result) {
                model.categoryname = result.name;
            });
        SearchService
            .getBrowseCategoryPlaylists($routeParams.categoryid)
            .then(function(results) {
                model.playlists = results.playlists.items;
                console.log(model.playlists);
            });
    }

})();
