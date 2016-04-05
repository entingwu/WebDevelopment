(function()
{
  angular
    .module("PandaMusicApp")
		.filter('trustUrl', function ($sce) {
			return function(url) {
				return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
		 };
		})
    .controller("UserController", UserController);
    
  function UserController($location, $rootScope, UserService)
  {
		var model = this;
		model.$location = $location;
		
		if ($rootScope.user != null) {
			UserService.findUserById($rootScope.user._id).then(function (user) {
				model.user = user;
				find();
			});
    }
																																	
		/*find current user's favorite songs, artists, and albums from database*/
		function find() {
			UserService.findSongsByUserId(model.user._id).then(function (songs) {
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
		
		model.deleteSong = function (song)
    {
      UserService.deleteSongFromUser(model.user._id, song.id).then(function (songs) {
				UserService
					.findSongsByUserId(model.user._id)
					.then(function (result) {
						model.user.songs = result;																								
					});
        console.log("successfully deleted song");
        console.log(model.user.songs);
      });
    }
		
		model.deleteArtist = function (artist)
    {
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
		
		model.deleteAlbum = function (album)
    {
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
		
		model.millisToMinutesAndSeconds = function (millis) {
			var minutes = Math.floor(millis / 60000);
			var seconds = ((millis % 60000) / 1000).toFixed(0);
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
		
		model.saveAlbum = function (albumId) {
			$rootScope.album = {id: albumId};
		}
		
		model.saveArtist = function (artistId) {
			$rootScope.artist = {id: artistId};
		}
		
		model.saveSong = function (songId) {
			$rootScope.song = {id: songId};
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/user";
		}
		
		model.follow = function() {
			UserService.addfollowToUser($rootScope.user._id, model.user).then(function(result) {
				console.log("successfully added a new following to current user");																																		
				console.log(result);
			});
		}
  }
})();