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
        $scope.$location = $location;
        $scope.query = $location.search().q || '';
        $scope.tracks = [];
        $scope.saveArtist = saveArtist;
        $scope.saveAlbum = saveAlbum;
        $scope.saveTrack = saveTrack;

        SearchService
            .getSearchResults($scope.query)
            .then(function(results) {
                $scope.tracks = results.tracks.items;
                $scope.playlists = results.playlists.items;
                console.log('search playlists: ', $scope.playlists);
                console.log('tracks: ', $scope.tracks);
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
                            console.log("Deleted song from user : ", user);
                            $scope.tracks[index].like = false;
                        });
                }else {//false
                    UserService
                        .addTrackToUser(user._id, likeTrack)
                        .then(function(user) {
                            console.log("Added track to user : ", user);
                            $scope.tracks[index].like = true;
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

