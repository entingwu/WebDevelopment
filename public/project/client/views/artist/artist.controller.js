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
        var model = this;
        model.$locaiton = $location;
        model.artistId = $routeParams.artist;
        model.data = null;//artist
        model.genres = [];
        model.likeArtistStatus = false;//follow artist
        model.albums = [];
        model.singles = [];
        model.appearson = [];

        if($rootScope.artist != null) {
            console.log($rootScope.artist);
            model.artist = $rootScope.artist;
        }

        SearchService
            .findArtistById(model.artistId)
            .then(function(artist) {
                model.data = artist;
                console.log(model.data.popularity);
                model.genres = model.data.genres;
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
            .findArtistTopTracks(model.artistId, Auth.getUserCountry())
            .then(function(toptracks) {
                console.log('got artist', toptracks);
                model.toptracks = toptracks.tracks;
                console.log(model.toptracks);
            });

        SearchService
            .findAlbumByArtist(model.artistId, Auth.getUserCountry())
            .then(function(albums) {
                console.log('got artist albums', albums);
                albums.items.forEach(function(album) {
                    if (album.album_type == 'album') {
                        model.albums.push(album);
                    }
                    if (album.album_type == 'single') {
                        model.singles.push(album);
                    }
                    if (album.album_type == 'appears-on') {
                        model.appearson.push(album);
                    }
                })
            });

        model.toggleFromYourMusic = function(index) {
            var likeTrack = model.toptracks[index];
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
                        model.toptracks[index].like = true;
                    }
                }
                if(model.toptracks[index].like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ", user);
                            model.toptracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ", user);
                            model.toptracks[index].like = true;
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
                            if (artist.id === model.data.id) {
                                console.log("found match artist", artist);
                                model.likeArtistStatus = true;
                            }
                        }
                        console.log("like artist status: " , model.likeArtistStatus);
                    });
            }
        }

        model.addArtistToUser = function() {
            UserService
                .addArtistToUser($rootScope.user._id, model.data)
                .then(function(user) {
                    console.log("Added artist to user", user);
                    setLikeArtistStatus();
                });
        };

        model.deleteArtistFromUser = function() {
            UserService
                .deleteArtistFromUser($rootScope.user._id, model.data.id)
                .then(function(result) {
                    console.log("delete artist from user");
                    console.log(result);
                    UserService
                        .findUserById($rootScope.user._id)
                        .then(function(user) {
                            model.user = user;
                            setLikeArtistStatus();
                    });
                });
        };

        model.saveAlbum = function(album) {
            $rootScope.album = album;
            console.log("#/artist : saved album");
            console.log($rootScope.album);
        };

        model.saveTrack = function(track) {
            console.log(track);
            $rootScope.track= track;
        };

    }
})();
