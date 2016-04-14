(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('BrowseCategoryController', function($scope, SearchService, $routeParams, Auth) {
        $scope.categoryname = '';

            SearchService
                .getBrowseCategory($routeParams.categoryid)
                .then(function(result) {
                $scope.categoryname = result.name;
            });
            SearchService
                .getBrowseCategoryPlaylists($routeParams.categoryid)
                .then(function(results) {
                $scope.playlists = results.playlists.items;
                console.log($scope.playlists);
            });
    });

})();
