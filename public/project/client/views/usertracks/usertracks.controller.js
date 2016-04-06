(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('UserTracksController', function($scope, $routeParams, UserService, PlayQueue) {
        $scope.username = $routeParams.username;
        $scope.tracks = [];

            UserService.getMyTracks().then(function(tracks) {
            console.log('got user tracks', tracks);
            $scope.tracks = tracks.items;
        });

        $scope.play = function(trackuri) {
            var trackuris = $scope.tracks.map(function(track) {
                return track.track.uri;
            });
            PlayQueue.clear();
            PlayQueue.enqueueList(trackuris);
            PlayQueue.playFrom(trackuris.indexOf(trackuri));
        };

        $scope.removeFromYourMusic = function(index) {
            UserService.removeFromMyTracks([$scope.tracks[index].track.id]).then(function(response) {
                $scope.tracks.splice(index, 1);
            });
        };

    });

})();
