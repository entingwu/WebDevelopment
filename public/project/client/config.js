(function(){
    "use strict";
    var app = angular
        .module("MusicPlayerApp",["ngRoute"])
        .config(function($routeProvider) {
           $routeProvider
               .when("/",{//URL Pattern
                   templateUrl: "views/home/home.view.html",
                   controller: "HomeController",
                   controllerAs: "model"
               })
               .when("/browsecategory/:categoryid", {
                   templateUrl: "views/browsecategory/browsecategory.view.html",
                   controller: "BrowseCategoryController",
                   controllerAs: "model"
               })
               .when("/user", {
                   templateUrl: "views/user/user.view.html",
                   controller: "UserController",
                   controllerAs: "model",
                   /*resolve: {
                       loggedin : checkCurrentUser
                   }*/
               })
               .when("/profile", {
                   templateUrl: "views/user/profile.view.html",
                   controller: "ProfileController",
                   controllerAs: "model",
                   /*resolve: {
                       loggedin : checkLoggedin
                   }*/
               })
               .when("/userfollow", {
                   templateUrl: "views/user/userfollow.view.html",
                   controller: "UserFollowController",
                   controllerAs: "model",
                   /*resolve: {
                       loggedin : checkCurrentUser
                   }*/
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
               .when("/admin", {
                   templateUrl: "views/admin/admin.view.html",
                   controller: "AdminController",
                   controllerAs: "model",
                   /*resolve: {
                       loggedin : checkAdmin
                   }*/
               })
               .otherwise({
                   redirectTo: "/"
               })
        });

    var checkLoggedin = function($rootScope, $http, $q, $location) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin')
            .success(function(user) {
                if(user!=='0') {
                    $rootScope.user = user;
                    console.log("checkLoggedin", user);
                    deferred.resolve(user);
                }else {
                    $location.url('/');
                    deferred.reject();
                }
            });
        return deferred.promise;
    };

    var checkAdmin = function($rootScope, $http, $q) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin')
            .success(function(user) {
                if(user !=='0' && user.roles.indexOf('admin') >= 0) {
                    $rootScope.user = user;
                    console.log("checkAdmin", user);
                    deferred.resolve(user);
                }else {
                    deferred.reject();
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function($rootScope, $http, $q) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin')
            .success(function(user) {
                if(user !== '0') {
                    $rootScope.user = user;
                    console.log("checkCurrentUser", user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    };

    app.controller('AppController', function($rootScope, $scope, $location, UserService, Auth) {
        $scope.$location = $location;
        console.log($scope.$location);

        $scope.loadsearch = function() {
            console.log('search for', $scope.query);
            $location.path('/search').search({ q: $scope.query }).replace();
        };

        $scope.logout = function() {
            console.log('do logout...');
            UserService
                .logoutUser()
                .then(
                    function(response) {
                        $rootScope.user = null;
                        $location.url("/");
                        $scope.$emit('logout');
                        Auth.setUsername('');
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        };

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return 'active';
            } else {
                return '';
            }
        };

        $scope.saveArtist = function(artist) {
            $rootScope.artist= artist;
        };

        $scope.saveAlbum = function(album) {
            $rootScope.album = album;
        };

        $scope.saveTrack = function(track) {
            console.log("save track", track);
            $rootScope.track= track;
        }

    });

})();