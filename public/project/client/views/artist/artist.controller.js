"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller('ArtistController', ArtistController);

    function ArtistController($scope, $rootScope, $routeParams, $location, UserService, SearchService, Auth) {
        $scope.$locaiton = $location;
        $scope.artistId = $routeParams.artist;
        $scope.data = null;//artist
        $scope.genres = [];
        $scope.likeArtistStatus = false;//follow artist

        $scope.albums = [];
        $scope.singles = [];
        $scope.appearson = [];

        if($rootScope.artist != null) {
            console.log($rootScope.artist);
            $scope.artist = $rootScope.artist;
        }

        SearchService
            .findArtistById($scope.artistId)
            .then(function(artist) {
                $scope.data = artist;
                console.log($scope.data.popularity);
                $scope.genres = $scope.data.genres;
                /* follow artist in artist page */
                if($rootScope.user != null) {
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function(user) {
                            console.log(user);
                            setLikeArtistStatus();
                        });
                }
            });

        SearchService
            .findArtistTopTracks($scope.artistId, Auth.getUserCountry())
            .then(function(toptracks) {
                console.log('got artist', toptracks);
                $scope.toptracks = toptracks.tracks;
                console.log($scope.toptracks);
            });

        SearchService
            .findAlbumByArtist($scope.artistId, Auth.getUserCountry())
            .then(function(albums) {
                console.log('got artist albums', albums);
                albums.items.forEach(function(album) {
                    if (album.album_type == 'album') {
                        $scope.albums.push(album);
                    }
                    if (album.album_type == 'single') {
                        $scope.singles.push(album);
                    }
                    if (album.album_type == 'appears-on') {
                        $scope.appearson.push(album);
                    }
                })
            });

        $scope.toggleFromYourMusic = function(index) {
            var likeTrack = $scope.toptracks[index];
            var user = $rootScope.user;
            likeTrack.albumName = likeTrack.album.name;
            likeTrack.albumId = likeTrack.album.id;
            likeTrack.artistName = likeTrack.artists[0].name;
            likeTrack.artistId = likeTrack.artists[0].id;
            console.log("likeTrack:", likeTrack);
            console.log(likeTrack);
            if(user != null) {
                var tracks = user.favoriteSongs;
                for (var i in tracks) {
                    var tr = tracks[i];
                    if (tr.id === likeTrack.id) {
                        console.log("found match track");
                        $scope.toptracks[index].like = true;
                    }
                }
                if($scope.toptracks[index].like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ");
                            console.log(user);
                            $scope.toptracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ");
                            console.log(user);
                            $scope.toptracks[index].like = true;
                        });
                }
            }
        };

        /* setLikeArtistStatus : display follow button in artist.view
         *  a. addArtistToUser
         *  b. deleteArtistFromUser*/
        function setLikeArtistStatus() {
            if($rootScope.user != null) {
                UserService
                    .findUserById($rootScope.user._id)
                    .then(function(user) {
                        $rootScope.user = user;
                        var artists = $rootScope.user.favoriteArtists;
                        console.log($rootScope.artist);
                        for (var i in artists) {
                            var artist = artists[i];
                            if (artist.id === $scope.data.id) {
                                console.log("found match artist", artist);
                                $scope.likeArtistStatus = true;
                            }
                        }
                        console.log("like artist status: " + $scope.likeArtistStatus);
                    });
            }
        }

        $scope.addArtistToUser = function() {
            UserService
                .addArtistToUser($rootScope.user._id, $scope.data)
                .then(function(user) {
                    console.log("Added artist to user", user);
                    setLikeArtistStatus();
                });
        };

        $scope.deleteArtistFromUser = function() {
            UserService
                .deleteArtistFromUser($rootScope.user._id, $scope.data.id)
                .then(function(result) {
                    console.log("delete artist from user");
                    console.log(result);
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function(user) {
                            $scope.user = user;
                            setLikeArtistStatus();
                    });
                });
        };

        $scope.saveAlbum = function(album) {
            $rootScope.album = album;
            console.log("#/artist : saved album");
            console.log($rootScope.album);
        };

        $scope.saveTrack = function(track) {
            console.log(track);
            $rootScope.track= track;
        };

    }
})();
