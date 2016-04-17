"use strict";
(function() {
    angular
        .module("MusicPlayerApp")
        .controller('UserController', UserController);

    function UserController($location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.deleteSong = deleteSong;
        model.deleteArtist = deleteArtist;
        model.deleteAlbum = deleteAlbum;
        model.millisToMinutesAndSeconds = millisToMinutesAndSeconds;
        model.saveAlbum = saveAlbum;
        model.saveArtist = saveArtist;
        model.saveSong = saveSong;
        model.saveLocation = saveLocation;
        model.follow = follow;

        if ($rootScope.user != null) {
            UserService.findUserById($rootScope.user._id).then(function (user) {
                model.user = user;
                init();
            });
        }

        /*find current user's favorite songs, artists, and albums from database*/
        function init() {
            UserService.findTracksByUserId(model.user._id).then(function (songs) {
                model.user.songs = songs;
                console.log("found user's favorite songs");
                console.log(model.user.songs);
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

        function deleteSong(song)
        {
            UserService.deleteTrackFromUser(model.user._id, song.id).then(function (songs) {
                UserService
                    .findTracksByUserId(model.user._id)
                    .then(function (result) {
                        model.user.songs = result;
                    });
                console.log("successfully deleted song");
                console.log(model.user.songs);
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

        function millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        function saveAlbum(albumId) {
            $rootScope.album = {id: albumId};
        }

        function saveArtist(artistId) {
            $rootScope.artist = {id: artistId};
        }

        function saveSong(songId) {
            $rootScope.song = {id: songId};
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
