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
                   controller: "BrowserCategoryController",
                   controllerAs: "model"
               })
               .when("/users/:username", {
                   templateUrl: "views/user/user.view.html",
                   controller: "UserController",
                   controllerAs: "model"
               })
               .when("/users/:username/tracks", {
                   templateUrl: "views/usertracks/usertracks.view.html",
                   controller: "UserTracksController",
                   controllerAs: "model"
               })
               .when("/users/:username/playlists/:playlist", {
                   templateUrl: "views/playlist/playlist.view.html",
                   controller: "PlaylistController",
                   controllerAs: "model"
               })
               .when("/playqueue", {
                   templateUrl: "views/playqueue/playqueue.view.html",
                   controller: "PlayQueueController",
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

    app.controller("AppController", function($scope, $location, Auth, API) {
        function checkUser(redirectToLogin) {

        }

        //$scope.isLoggedIn = (Auth.getAccessToken() != '');
        //$scope.showplayer = $scope.isLoggedIn;
        //$scope.showlogin = !$scope.isLoggedIn;

    });

})();