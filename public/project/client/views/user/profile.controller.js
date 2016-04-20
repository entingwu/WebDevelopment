"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.deleteTrack = deleteTrack;
        model.deleteArtist = deleteArtist;
        model.deleteAlbum = deleteAlbum;
        model.saveAlbum = saveAlbum;
        model.saveArtist = saveArtist;
        model.saveTrack = saveTrack;
        model.saveLocation = saveLocation;
        model.follow = follow;

        if ($rootScope.user != null) {
            UserService.findUserById($rootScope.user._id).then(function (user) {
                model.user = user;
                init();
            });
        }

        /*find current user's favorite tracks, artists, and albums from database*/
        function init() {
            UserService.findTracksByUserId(model.user._id).then(function (tracks) {
                model.user.tracks = tracks;
                console.log("found user's favorite tracks");
                console.log(model.user.tracks);
            });

            UserService.findArtistsByUserId(model.user._id).then(function (artists) {
                model.user.artists = artists;
                console.log("found user's favorite artists");
                console.log(model.user.artists);
            });

            UserService.findAlbumsByUserId(model.user._id).then(function (albums) {
                model.user.albums = albums;
                console.log("found user's favorite albums");
                console.log(model.user.albums);
            });
        }

        function deleteTrack(track) {
            UserService.deleteTrackFromUser(model.user._id, track.id)
                .then(function (tracks) {
                UserService
                    .findTracksByUserId(model.user._id)
                    .then(function (result) {
                        model.user.tracks = result;
                    });
                console.log("successfully deleted track");
                console.log(model.user.tracks);
            });
        }

        function deleteArtist(artist) {
            console.log("successfully deleted artist");
            console.log(model.user.artists);
            UserService.deleteArtistFromUser(model.user._id, artist.id).then(function (artists) {
                UserService
                    .findArtistsByUserId(model.user._id)
                    .then(function (result) {
                        model.user.artists = result;
                    });
                console.log("successfully deleted artist");
                console.log(model.user.artists);
            });
        }

        function deleteAlbum(album) {
            UserService.deleteAlbumFromUser(model.user._id, album.id).then(function (albums) {
                UserService
                    .findAlbumsByUserId(model.user._id)
                    .then(function (result) {
                        model.user.albums = result;
                    });
                console.log("successfully deleted album");
                console.log(model.user.albums);
            });
        }

        function saveAlbum(albumId) {
            $rootScope.album = {id: albumId};
        }

        function saveArtist(artistId) {
            $rootScope.artist = {id: artistId};
        }

        function saveTrack(trackId) {
            $rootScope.track = {id: trackId};
        }

        function saveLocation() {
            $rootScope.location = "/user";
        }

        function follow() {
            UserService.addfollowToUser($rootScope.user._id, model.user).then(function(result) {
                console.log("successfully added a new following to current user");
                console.log(result);
            });
        }
    }

})();
