(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('BrowseCategoryController', function($scope, UserService, $routeParams, Auth) {
        $scope.categoryname = '';

            UserService.getBrowseCategory($routeParams.categoryid).then(function(result) {
            $scope.categoryname = result.name;
        });
            UserService.getBrowseCategoryPlaylists($routeParams.categoryid, Auth.getUserCountry()).then(function(results) {
            $scope.playlists = results.playlists.items;
        });
    });

})();
