(function(){
    "use strict";
    var app = angular
        .module("MusicPlayerApp",["ngRoute"])
        .config(function($routeProvider) {
           $routeProvider
               .when("/home",{//URL Pattern
                   templateUrl: "views/home/home.view.html",
                   controller: "HomeController"
               })
               .when("/login", {
                   templateUrl: "views/users/login.view.html",
                   controller: "LoginController"
               })
               .when("/register", {
                   templateUrl: "views/users/register.view.html",
                   controller: "RegisterController"
               })
               .when("/users/:profile", {
                   templateUrl: "views/users/profile/profile.view.html",
                   controller: "ProfileController"
               })
               .when("/users/:profile/tracks", {
                   templateUrl: "views/users/usertracks/usertracks.view.html",
                   controller: "UserTracksController"
               })
               .when("/users/:profile/playlist/:playlist", {
                   templateUrl: "views/users/playlist/playlist.view.html",
                   controller: "PlaylistController"
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
                   controller: "SearchResultController"
               })
               .when("/genres/:genresid", {
                   templateUrl: "views/category/genres.view.html",
                   controller: "BrowserCategoryController"
               })
               .otherwise({
                   redirectTo: "/home"
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