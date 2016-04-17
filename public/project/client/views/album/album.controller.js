"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller("AlbumController", AlbumController);

    function AlbumController($scope, $rootScope, $routeParams, $location, UserService, SearchService) {
        $scope.$location = $location;
        $scope.albumId = $routeParams.album;
        $scope.data = null;
        $scope.likeAlbumStatus = false;
        $scope.release_year = '';
        $scope.total_duration = 0;
        $scope.num_discs = 0;
        $scope.tracks = [];

        if ($rootScope.album != null) {
            console.log($rootScope.album);
            $scope.album = $rootScope.album
        }

        SearchService
            .findAlbumById($scope.albumId)
            .then(function(album) {
                console.log("#/album: found album : ", album);
                $scope.data = album;
                if (album.release_date) {
                    $scope.release_year = album.release_date.substring(0, 4); //
                }
                /* user like album in #/album */
                if($rootScope.user != null) {
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function (user) {
                            console.log("user : ",user);
                            setLikeAlbumStatus();
                    });
                }
            });

        SearchService
            .findTracksByAlbum($scope.albumId)
            .then(function (tracks) {
                console.log('got album tracks', tracks);
                /* split into discs */
                var discs = [];
                var disc = { disc_number: 1, tracks: []};//init
                var totalTime = 0;
                tracks.items.forEach(function(track) {//every track
                    totalTime += track.duration_ms;
                    if(track.disc_number != disc.disc_number) {
                        discs.push(disc);
                        disc = { disc_number: track.disc_number, tracks: []};
                    }
                    disc.tracks.push(track);
                    track.popularity = 0;
                });
                discs.push(disc);
                console.log('save discs', discs);
                $scope.discs = discs;
                $scope.tracks = tracks.items;
                console.log($scope.tracks[0]);
                $scope.num_discs = discs.length;
                $scope.total_duration = totalTime;

                /* track id array */
                var ids = $scope.tracks.map(function(track) {
                    return track.id;
                });

                SearchService
                    .getTracks(ids)
                    .then(function(results) {
                        results.tracks.forEach(function(result, index) {
                            $scope.tracks[index].popularity = result.popularity;
                    });
                });
            });

        $scope.toggleFromYourMusic = function(index) {
            var likeTrack = $scope.tracks[index];
            var user = $rootScope.user;
            console.log(likeTrack);
            if(user != null) {
                var tracks = user.favoriteSongs;
                for (var i in tracks) {
                    var tr = tracks[i];
                    if (tr.id === likeTrack.id) {
                        console.log("found match track");
                        $scope.tracks[index].like = true;
                    }
                }
                if($scope.tracks[index].like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ");
                            console.log(user);
                            $scope.tracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ");
                            console.log(user);
                            $scope.tracks[index].like = true;
                        });
                }
            }
        };

        /* setLikeAlbumStatus : display follow button in album.view
         *  a. addAlbumToUser
         *  b. deleteAlbumFromUser*/
        function setLikeAlbumStatus() {
            if($rootScope.user != null) {
                UserService
                    .findUserById($rootScope.user._id)
                    .then(function (user) {
                        $rootScope.user = user;
                        var albums = $rootScope.user.favoriteAlbums;
                        console.log("user like : ", $rootScope.user.favoriteAlbums);
                        for (var i in albums) {
                            var album = albums[i];
                            if(album.id === $scope.data.id) {
                                console.log("found match album", album);
                                $scope.likeAlbumStatus = true;
                            }
                        }
                        console.log("like album status: " + $scope.likeAlbumStatus);
                });
            }
        }

        $scope.addAlbumToUser = function () {
            UserService.addAlbumToUser($rootScope.user._id, $scope.data)
                .then(function(user) {
                    console.log("Added album to user", user);
                    setLikeAlbumStatus();
                })
        };

        $scope.deleteAlbumFromUser = function() {
            UserService.deleteAlbumFromUser($rootScope.user._id, $scope.data.id)
                .then(function(result) {
                    console.log("Deleted album from user");
                    console.log(result);
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function(user) {
                            $scope.user = user;
                            setLikeAlbumStatus();
                    });
                });
        };

        $scope.saveTrack = function(track) {
            $rootScope.track = track;
        };

        $scope.saveArtist = function(artist) {
            $rootScope.artist = artist;
            console.log("#/artist : saved album", $rootScope.artist);
        };

    }
})();