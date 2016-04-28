"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller('SearchResultsController', SearchResultsController);

    function SearchResultsController($scope, $rootScope, $location, UserService, SearchService) {
        var model = this;
        model.$location = $location;
        model.query = $location.search().q || '';
        model.tracks = [];
        model.saveArtist = saveArtist;
        model.saveAlbum = saveAlbum;
        model.saveTrack = saveTrack;

        SearchService
            .getSearchResults(model.query)
            .then(function(results) {
                model.tracks = results.tracks.items;
                model.playlists = results.playlists.items;
                console.log('search playlists: ', model.playlists);
                console.log('tracks: ', model.tracks);
        });

        model.toggleFromYourMusic = function(index) {
            var likeTrack = model.tracks[index];
            var user = $rootScope.user;
            likeTrack.albumName = likeTrack.album.name;
            likeTrack.albumId = likeTrack.album.id;
            likeTrack.artistName = likeTrack.artists[0].name;
            likeTrack.artistId = likeTrack.artists[0].id;
            console.log("likeTrack:", likeTrack);
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
                            console.log("Deleted song from user : ", user);
                            model.tracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ", user);
                            model.tracks[index].like = true;
                        });
                }
            }
        };

        function saveArtist(artist) {
            console.log("save artist", artist);
            $rootScope.artist= artist;
        }

        function saveAlbum(album) {
            $rootScope.album = album;
        }

        function saveTrack(track) {
            console.log("save track", track);
            $rootScope.track= track;
        }
    }

})();

