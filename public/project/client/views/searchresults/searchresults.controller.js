(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
            };
        })
        .controller('SearchResultsController', SearchResultsController);

    function SearchResultsController($scope, SearchService, $location) {
        $scope.query = $location.search().q || '';
        $scope.tracks = [];

        SearchService.getSearchResults($scope.query)
            .then(function(results) {
            console.log('got search results', results);
            $scope.tracks = results.tracks.items;
            $scope.playlists = results.playlists.items;

        });

        var model = this;
        model.$location = $location;
        model.artists = [];
        model.albums = [];
        model.search = search;
        model.saveArtist = saveArtist;
        model.saveAlbum = saveAlbum;
        model.saveSong = saveSong;

        function search(name) {
            if (name != null) {
                SearchService.findArtistByName(name)
                    .then(function (result) {
                        console.log("successfully found artist array");
                        model.artists = result.artists.items;
                        console.log(model.artists);
                        if (model.artists != null) {
                            model.showArtist = true;
                        }
                    });

                SearchService.findAlbumByName(name)
                    .then(function (result) {
                        console.log("successfully found album array");
                        model.albums = result.albums.items;
                        console.log(model.albums);
                        if (model.albums != null) {
                            model.showAlbum = true;
                        }
                    });

                SearchService.findSongByName(name)
                    .then(function (result) {
                        console.log("successfully found song array");
                        model.songs = result.tracks.items;
                        console.log(model.songs);
                        if (model.songs != null) {
                            model.showSong = true;
                        }
                    });
            }
        }

        function saveArtist(artist) {
            console.log("save artist");
            console.log(artist);
            $rootScope.artist= artist;
        }

        function saveAlbum(album) {
            $rootScope.album = album;
        }

        function saveSong(song) {
            console.log("save song");
            console.log(song);
            $rootScope.song= song;
        }
    }

})();

