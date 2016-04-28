(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller('PlaylistController', PlaylistController);

    function PlaylistController($scope, $rootScope, $routeParams, $sce, UserService, SearchService) {
        var model = this;
        model.playlist = $routeParams.playlist;
        model.username = $routeParams.username;
        console.log("playlist:", model.playlist);

        model.name = '';
        model.tracks = [];
        model.data = null;
        model.total_duration = 0;

        SearchService
            .getPlaylist(model.username, model.playlist)
            .then(function(list) {
                console.log('got playlist', list);
                model.name = list.name;
                model.data = list;
                model.playlistDescription = $sce.trustAsHtml(list.description);
            });

        SearchService
            .getPlaylistTracks(model.username, model.playlist)
            .then(function(list) {
                console.log('got playlist tracks', list);
                var totalTime = 0;
                list.items.forEach(function(track) {
                    totalTime += track.track.duration_ms;
                });
                model.tracks = list.items;
                console.log('tracks : ', model.tracks);
                model.total_duration = totalTime;
            });

        model.toggleFromYourMusic = function(index) {
            var likeTrack = model.tracks[index].track;
            var user = $rootScope.user;
            likeTrack.albumName = likeTrack.album.name;
            likeTrack.albumId = likeTrack.album.id;
            likeTrack.artistName = likeTrack.artists[0].name;
            likeTrack.artistId = likeTrack.artists[0].id;
            console.log("likeTrack:", likeTrack);
            if(user != null) {
                var trks = user.favoriteSongs;
                for (var i in trks) {
                    var tr = trks[i];
                    if (tr.id === likeTrack.id) {
                        console.log("found match track");
                        model.tracks[index].track.like = true;
                    }
                }
                if(model.tracks[index].track.like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ");
                            console.log(user);
                            model.tracks[index].track.like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ");
                            console.log(user);
                            model.tracks[index].track.like = true;
                        });
                }
            }
        };

        model.saveArtist = function(artist) {
            $rootScope.artist = artist;
            console.log($rootScope.artist);
        };

        model.saveAlbum = function(album) {
            $rootScope.album = album;
        };

        model.saveTrack = function(track) {
            console.log(track);
            $rootScope.track= track;
        };
    }

})();

