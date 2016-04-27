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
        $scope.playlist = $routeParams.playlist;
        $scope.username = $routeParams.username;
        console.log("playlist:", $scope.playlist);

        $scope.name = '';
        $scope.tracks = [];
        $scope.data = null;
        $scope.total_duration = 0;

        SearchService
            .getPlaylist($scope.username, $scope.playlist)
            .then(function(list) {
                console.log('got playlist', list);
                $scope.name = list.name;
                $scope.data = list;
                $scope.playlistDescription = $sce.trustAsHtml(list.description);
            });

        SearchService
            .getPlaylistTracks($scope.username, $scope.playlist)
            .then(function(list) {
                console.log('got playlist tracks', list);
                var totalTime = 0;
                list.items.forEach(function(track) {
                    totalTime += track.track.duration_ms;
                });
                $scope.tracks = list.items;
                console.log('tracks : ', $scope.tracks);
                $scope.total_duration = totalTime;
            });

        $scope.toggleFromYourMusic = function(index) {
            var likeTrack = $scope.tracks[index].track;
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
                        $scope.tracks[index].track.like = true;
                    }
                }
                if($scope.tracks[index].track.like) {//true
                    UserService
                        .deleteTrackFromUser(user._id, likeTrack.id)
                        .then(function(user) {
                            console.log("Deleted song from user : ");
                            console.log(user);
                            $scope.tracks[index].track.like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ");
                            console.log(user);
                            $scope.tracks[index].track.like = true;
                        });
                }
            }
        };

        $scope.saveArtist = function(artist) {
            $rootScope.artist = artist;
            console.log($rootScope.artist);
        };

        $scope.saveAlbum = function(album) {
            $rootScope.album = album;
        };

        $scope.saveTrack = function(track) {
            console.log(track);
            $rootScope.track= track;
        };
    }

})();

