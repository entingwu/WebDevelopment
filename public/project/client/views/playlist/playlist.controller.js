(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller('PlaylistController', function($scope, $rootScope, UserService, $routeParams, Auth, $sce) {
            $scope.playlist = $routeParams.playlist;
            $scope.username = $routeParams.username;
            console.log("playlist:");

            $scope.name = '';
            $scope.tracks = [];
            $scope.data = null;
            $scope.total_duration = 0;

            UserService.getPlaylist($scope.username, $scope.playlist).then(function(list) {
                console.log('got playlist', list);
                $scope.name = list.name;
                $scope.data = list;
                $scope.playlistDescription = $sce.trustAsHtml(list.description);
            });

            UserService.getPlaylistTracks($scope.username, $scope.playlist).then(function(list) {
                console.log('got playlist tracks', list);
                var tot = 0;
                list.items.forEach(function(track) {
                    tot += track.track.duration_ms;
                });
                $scope.tracks = list.items;
                console.log('tot', tot);
                $scope.total_duration = tot;
            });

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

        });
})();

