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
        var model = this;
        model.$location = $location;
        model.albumId = $routeParams.album;
        model.data = null;
        model.likeAlbumStatus = false;
        model.release_year = '';
        model.total_duration = 0;
        model.num_discs = 0;
        model.tracks = [];

        if ($rootScope.album != null) {
            console.log($rootScope.album);
            model.album = $rootScope.album
        }

        SearchService
            .findAlbumById(model.albumId)
            .then(function(album) {
                console.log("#/album: found album : ", album);
                model.data = album;
                if (album.release_date) {
                    model.release_year = album.release_date.substring(0, 4); //
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
            .findTracksByAlbum(model.albumId)
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
                model.discs = discs;
                model.tracks = tracks.items;
                console.log(model.tracks[0]);
                model.num_discs = discs.length;
                model.total_duration = totalTime;

                /* track id array */
                var ids = model.tracks.map(function(track) {
                    return track.id;
                });

                SearchService
                    .getTracks(ids)
                    .then(function(results) {
                        results.tracks.forEach(function(result, index) {
                            model.tracks[index].popularity = result.popularity;
                    });
                });
            });

        model.toggleFromYourMusic = function(index) {
            var likeTrack = model.tracks[index];
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
                        model.tracks[index].like = true;
                    }
                }
                if(model.tracks[index].like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ");
                            console.log(user);
                            model.tracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ");
                            console.log(user);
                            model.tracks[index].like = true;
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
                            if(album.id === model.data.id) {
                                console.log("found match album", album);
                                model.likeAlbumStatus = true;
                            }
                        }
                        console.log("like album status: " + model.likeAlbumStatus);
                });
            }
        }

        model.addAlbumToUser = function () {
            UserService.addAlbumToUser($rootScope.user._id, model.data)
                .then(function(user) {
                    console.log("Added album to user", user);
                    setLikeAlbumStatus();
                })
        };

        model.deleteAlbumFromUser = function() {
            UserService.deleteAlbumFromUser($rootScope.user._id, model.data.id)
                .then(function(result) {
                    console.log("Deleted album from user");
                    console.log(result);
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function(user) {
                            model.user = user;
                            setLikeAlbumStatus();
                    });
                });
        };

        model.saveTrack = function(track) {
            $rootScope.track = track;
        };

        model.saveArtist = function(artist) {
            $rootScope.artist = artist;
            console.log("#/artist : saved album", $rootScope.artist);
        };

    }
})();