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
                   controller: "UserController",
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
               .when("/albums/:album", {
                   templateUrl: "views/album/album.view.html",
                   controller: "AlbumController",
                   controllerAs: "model"
               })
               .when("/artists/:artist", {
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

    app.controller('AppController', function($rootScope, $scope, $location, Auth, UserService) {
        $scope.$location = $location;
        console.log($scope.$location);

        $scope.loadsearch = function() {
            console.log('search for', $scope.query);
            $location.path('/search').search({ q: $scope.query }).replace();
        };

        $scope.logout = function() {
            console.log('do logout...');
            Auth.setUsername('');
            Auth.setAccessToken('', 0);
            $scope.$emit('logout');
        };

        $scope.isLoggedIn = (Auth.getAccessToken() != '');
        $scope.showplayer = $scope.isLoggedIn;
        $scope.showlogin = !$scope.isLoggedIn;
        $scope.focusInput = false;

        $scope.$on('login', function() {
            $scope.showplayer = true;
            $scope.showlogin = false;
            $location.path('/').replace().reload();
        });
        $scope.$on('logout', function() {
            $scope.showplayer = false;
            $scope.showlogin = true;
        });

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return 'active';
            } else {
                return '';
            }
        };




    });

})();