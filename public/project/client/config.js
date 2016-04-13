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
               .when("/user", {
                   templateUrl: "views/user/user.view.html",
                   controller: "UserController",
                   controllerAs: "model"
               })
               .when("/userfollow", {
                       templateUrl: "views/userfollower/userfollower.view.html",
                       controller: "UserFollowController",
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

    app.controller('AppController', function($rootScope, $scope, Auth, UserService, $location) {
        console.log('in AppController');
        console.log(location);

        function checkUser(redirectToLogin) {
            /*UserService.getMe().then(function(userInfo) {
                Auth.setUsername(userInfo.id);
                Auth.setUserCountry(userInfo.country);
                if (redirectToLogin) {
                    $scope.$emit('login');
                    $location.replace();
                }
            }, function(err) {
                $scope.showplayer = false;
                $scope.showlogin = true;
                $location.replace();
            });*/
        }

        /*window.addEventListener("message", function(event) {
            console.log('got postmessage', event);
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
                checkUser(true);
            }
        }, false);*/

        $scope.isLoggedIn = (Auth.getAccessToken() != '');
        $scope.showplayer = $scope.isLoggedIn;
        $scope.showlogin = !$scope.isLoggedIn;

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

        $scope.focusInput = false;
        $scope.menuOptions = function(playlist) {

            var visibilityEntry = [playlist.public ? 'Make secret' : 'Make public', function ($itemScope) {
                API.changePlaylistDetails(playlist.username, playlist.id, {public: !playlist.public})
                    .then(function() {
                        playlist.public = !playlist.public;
                    });
            }];

            var own = playlist.username === Auth.getUsername();
            if (own) {
                return [
                    visibilityEntry,
                    null,
                    ['Rename', function ($itemScope) {
                        playlist.editing = true;
                        $scope.focusInput = true;
                    }]
                ];
            } else {
                return [ visibilityEntry ];
            }
        };

        $scope.playlistNameKeyUp = function(event, playlist) {
            if (event.which === 13) {
                // enter
                var newName = event.target.value;
                API.changePlaylistDetails(playlist.username, playlist.id, {name: newName})
                    .then(function() {
                        playlist.name = newName;
                        playlist.editing = false;
                        $scope.focusInput = false;
                    });
            }

            if (event.which === 27) {
                // escape
                playlist.editing = false;
                $scope.focusInput = false;
            }
        };

        $scope.playlistNameBlur = function(playlist) {
            playlist.editing = false;
            $scope.focusInput = false;
        };

        checkUser();
    });

})();