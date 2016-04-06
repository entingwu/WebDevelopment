(function()
{
  angular
    .module("PandaMusicApp")
		.filter('trustUrl', function ($sce) {
			return function(url) {
				return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
		 };
		})
    .controller("ViewUserController", ViewUserController);
    
  function ViewUserController($location, $rootScope, UserService)
  {
		var model = this;
		model.$location = $location;
		if ($rootScope.user != null && $rootScope.currentUserId == $rootScope.user._id) {
			$location.url("/user");
		}
		
		if  ($rootScope.currentUserId != null) {
			UserService.findUserById($rootScope.currentUserId).then(function (user) {
				console.log("view user");
				console.log(user);
				model.user = user;
				find();
				setFollowStatus();
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
		
		function setFollowStatus() {
			if ($rootScope.user != null) {
				UserService.findUserById($rootScope.user._id).then(function (user) {
					$rootScope.user = user;
					var followings = $rootScope.user.following;
					console.log("login user's following");
					console.log($rootScope.user.following);
					console.log(model.user._id);
					for (var i = 0; i < followings.length; i++) {
						var follow = followings[i];
						if (follow.id === model.user._id) {
							console.log("found match follow");
							model.followStatus = true;
						}
					}
					if(model.followStatus != true) {
						model.followStatus = false;	
					}
					console.log("show follow status: ");
					console.log(model.followStatus);
				});
			}
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
		
		model.saveCurrentUserId = function () {
			console.log("saved current user id");
			console.log(model.user._id);
			$rootScope.currentUserId = model.user._id;
		}
		
		model.follow = function() {
			UserService.addfollowToUser($rootScope.user._id, model.user).then(function(result) {
				console.log("successfully added a new following to current user");																																		
				console.log(result);
				UserService.findUserById($rootScope.currentUserId).then(function (user) {
					model.user = user;
					setFollowStatus();
				});
			});
		}
		
		model.unfollow = function() {
			UserService.deleteFollowingFromUser($rootScope.user._id, model.user._id)
				.then(function(result) {
					console.log("delete following from the current login user")
					console.log(result);
					UserService.findUserById($rootScope.currentUserId).then(function (user) {
						model.user = user;
						setFollowStatus();
					});
				});
			UserService.deleteFollowerFromUser(model.user._id, $rootScope.user._id)
				.then(function(result) {
							console.log("delete follower from the view-user")
							console.log(result);																																									
				});
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/view-user";
		}
  }
})();