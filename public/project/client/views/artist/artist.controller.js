(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('ArtistController', ArtistController);

    function ArtistController($scope, $rootScope, $routeParams, UserService, SearchService, Auth) {
        $scope.artistId = $routeParams.artist;
        console.log($scope.artistId);
        $scope.data = null;
        $scope.genres = [];
        $scope.albums = [];
        $scope.singles = [];
        $scope.appearson = [];

        $scope.isFollowing = false;
        $scope.isFollowHovered = false;

        if($rootScope.artist != null) {
            console.log("#/artist: current artist is: ");
            console.log($rootScope.artist);
            SearchService
                .findArtistById($scope.artistId)
                .then(function(artist) {
                    $scope.data = artist;
                    console.log($scope.data.followers.total);
                    $scope.genres = $scope.data.genres;

                    if  ($rootScope.user != null) {
                        UserService
                            .findUserById($rootScope.user._id)
                            .then(function(user) {
                                console.log(user);
                                followArtist();
                        });
                    }
                    SearchService
                        .findAlbumByArtist($scope.artistId)
                        .then(function(response) {
                            console.log("#/artist: found albums");
                            $scope.albums = response.items;
                            console.log($scope.albums);
                        });
                });
        }

        function followArtist() {
            if ($rootScope.user != null) {
                UserService
                    .findUserById($rootScope.user._id)
                    .then(function(user) {
                        $rootScope.user = user;
                        var artists = $rootScope.user.favoriteArtists;
                        console.log("login user's favorite");
                        console.log($rootScope.user.favoriteArtists);
                        console.log($rootScope.artist);
                        for (var i = 0; i < artists.length; i++) {
                            var artist = artists[i];
                            if (artist.id === model.artist.id) {
                                console.log("found match artist");
                                model.likeStatus = true;
                            }
                        }
                        if(model.likeStatus != true) {
                            model.likeStatus = false;
                        }
                        console.log("show like status: ");
                        console.log(model.likeStatus);
                });
            }
        }

        SearchService
            .findArtistById($scope.artistId)
            .then(function(artist) {
            console.log('got artist', artist);
            $scope.data = artist;
        });

        API.getArtistTopTracks($scope.artistId, Auth.getUserCountry()).then(function(toptracks) {
            console.log('got artist', toptracks);
            $scope.toptracks = toptracks.tracks;

            var ids = $scope.toptracks.map(function(track) {
                return track.id;
            });

            API.containsUserTracks(ids).then(function(results) {
                results.forEach(function(result, index) {
                    $scope.toptracks[index].inYourMusic = result;
                });
            });
        });

        API.getArtistAlbums($scope.artistId, Auth.getUserCountry()).then(function(albums) {
            console.log('got artist albums', albums);
            $scope.albums = [];
            $scope.singles = [];
            $scope.appearson = [];
            albums.items.forEach(function(album) {
                console.log(album);
                if (album.album_type == 'album') {
                    $scope.albums.push(album);
                }
                if (album.album_type == 'single') {
                    $scope.singles.push(album);
                }
                if (album.album_type == 'appears-on') {
                    $scope.appearson.push(album);
                }
            })
        });

        $scope.toggleFromYourMusic = function(index) {
            if ($scope.toptracks[index].inYourMusic) {
                API.removeFromMyTracks([$scope.toptracks[index].id]).then(function(response) {
                    $scope.toptracks[index].inYourMusic = false;
                });
            } else {
                API.addToMyTracks([$scope.toptracks[index].id]).then(function(response) {
                    $scope.toptracks[index].inYourMusic = true;
                });
            }
        };

        API.isFollowing($scope.artistId, "artist").then(function(booleans) {
            console.log("Got following status for artist: " + booleans[0]);
            $scope.isFollowing = booleans[0];
        });

        $scope.follow = function(isFollowing) {
            if (isFollowing) {
                API.unfollow($scope.artistId, "artist").then(function() {
                    $scope.isFollowing = false;
                    $scope.data.followers.total--;
                });
            } else {
                API.follow($scope.artistId, "artist").then(function() {
                    $scope.isFollowing = true;
                    $scope.data.followers.total++;
                });
            }
        };



    }

})();
