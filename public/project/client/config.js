(function(){
    "use strict";
    var app = angular
        .module("MusicPlayerApp",["ngRoute"])
        .config(function($routeProvider) {
           $routeProvider
               .when("/",{//URL Pattern
                   templateUrl: "views/browse/browse.view.html",
                   controller: "BrowseController"
               })
               .when("/browsecategory/:categoryid", {
                   templateUrl: "views/browsecategory/browsecategory.view.html",
                   controller: "BrowserCategoryController"
               })
               .when("/users/:username", {
                   templateUrl: "views/user/user.view.html",
                   controller: "UserController"
               })
               .when("/users/:username/tracks", {
                   templateUrl: "views/usertracks/usertracks.view.html",
                   controller: "UserTracksController"
               })
               .when("/users/:username/playlists/:playlist", {
                   templateUrl: "views/playlist/playlist.view.html",
                   controller: "PlaylistController"
               })
               .when("/playqueue", {
                   templateUrl: "views/playqueue/playqueue.view.html",
                   controller: "PlayQueueController"
               })
               .when("/albums/:album", {
                   templateUrl: "views/album/album.view.html",
                   controller: "AlbumController"
               })
               .when("/artists/:artist", {
                   templateUrl: "views/artist/artist.view.html",
                   controller: "ArtistController"
               })
               .when("/search", {
                   templateUrl: "views/searchresults/searchresults.view.html",
                   controller: "SearchResultsController"
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