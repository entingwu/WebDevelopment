(function(){
    "use strict";
    var app = angular
        .module("MusicPlayerApp",["ngRoute"])
        .config(function($routeProvider) {
           $routeProvider
               .when("/",{//URL Pattern
                   templateUrl: "views/browse/browse.view.html",
                   controller: "BrowseController",
                   controllerAs: "model"
               })
               .when("/browsecategory/:categoryid", {
                   templateUrl: "views/browsecategory/browsecategory.view.html",
                   controller: "BrowseCategoryController",
                   controllerAs: "model"
               })
               .when("/profile", {
                   templateUrl: "views/profile/profile.view.html",
                   controller: "ProfileController",
                   controllerAs: "model"
               })
               .when("/userfollow", {
                   templateUrl: "views/userfollow/userfollow.view.html",
                   controller: "UserFollowController",
                   controllerAs: "model"
               })
               .when('/users/:username/playlists/:playlist', {
                   templateUrl: 'views/playlist/playlist.view.html',
                   controller: 'PlaylistController',
                   controllerAs: "model"
                })
               .when("/albums/:album", {//id
                   templateUrl: "views/album/album.view.html",
                   controller: "AlbumController",
                   controllerAs: "model"
               })
               .when("/artists/:artist", {//id
                   templateUrl: "views/artist/artist.view.html",
                   controller: "ArtistController",
                   controllerAs: "model"
               })
               .when("/search", {
                   templateUrl: "views/searchresults/searchresults.view.html",
                   controller: "SearchResultsController",
                   controllerAs: "model"
               })
               .otherwise({
                   redirectTo: "/"
               })
        });

    app.controller('AppController', function($rootScope, $scope, $location, UserService, Auth) {
        $scope.$location = $location;
        console.log($scope.$location);
        $rootScope.loginMessage = false;

        $scope.loadsearch = function() {
            console.log('search for', $scope.query);
            $location.path('/search').search({ q: $scope.query }).replace();
        };

        $scope.logout = function() {
            console.log('do logout...');
            $rootScope.user = null;
            $rootScope.loginMessage = false;
            $rootScope.loginAsAdmin = false;

            Auth.setUsername('');
            $location.url("/");
            $scope.$emit('logout');
        };

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return 'active';
            } else {
                return '';
            }
        };




    });

})();