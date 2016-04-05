(function()
{
  angular
    .module("PandaMusicApp")
		.filter('trustUrl', function ($sce) {
			return function(url) {
				return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
		 };
		})
		.filter('range', function() {
			return function(val, range) {
				range = parseInt(range / 20);
				for (var i=0; i<=range; i++)
					val.push(i);
				return val;
			};
		})
    .controller("SongController", SongController);
    
  function SongController($location, $rootScope, SearchService, UserService, CommentService)
  {
		var model = this;
		model.$location = $location;
		
		if($rootScope.song != null) {
			SearchService.findSongById($rootScope.song.id)
				.then(function (result) {
					console.log("successfully found song");
					model.song = result;
					console.log(model.song);
				
					if  ($rootScope.user != null) {
						UserService.findUserById($rootScope.user._id).then(function (user) {
							console.log("view user");
							console.log(user);
							model.user = user;
							setLikeStatus();
						});
					}
				
					/*get all comments for this ablum from database*/
					CommentService
						.findAllCommentsBySongId(model.song.id)
						.then(function(response) {
							console.log("successfully found comments");
							console.log(response);
							model.comments = response;
						});
				});
		}
		
		function setLikeStatus() {
			if ($rootScope.user != null) {
				UserService.findUserById($rootScope.user._id).then(function (user) {
					$rootScope.user = user;
					var songs = $rootScope.user.favoriteSongs;
					console.log("login user's favorite");
					console.log($rootScope.user.favoriteSongs);
					console.log(model.song);
					for (var i = 0; i < songs.length; i++) {
						var song = songs[i];
						if (song.id === model.song.id) {
							console.log("found match song");
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
		
		model.deleteSongFromUser = function() {
			UserService.deleteSongFromUser($rootScope.user._id, model.song.id)
				.then(function(result) {
					console.log("delete song from the current login user")
					console.log(result);
					UserService.findUserById($rootScope.user._id).then(function (user) {
						model.user = user;
						setLikeStatus();
					});
				});
		}
		
		model.millisToMinutesAndSeconds = function (millis) {
			var minutes = Math.floor(millis / 60000);
			var seconds = ((millis % 60000) / 1000).toFixed(0);
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
		
		model.replaceUri = function (song) {
			console.log("replace this song's uri");
			console.log(song);
			console.log("https://embed.spotify.com/?uri=" + song.uri);
			return "https://embed.spotify.com/?uri=" + song.uri;
		}
		
		model.saveSong = function (song) {
			$rootScope.song = song;
		}
		
		model.saveArtist = function (artist) {
			$rootScope.artist = artist;
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/song";
		}
		
		model.addSongToUser = function ()
		{
			console.log("add song to current user: ");
			console.log($rootScope.user);
			UserService.addSongToUser($rootScope.user._id, model.song)
				.then(function(user) {
				console.log("successfully added song to user");
				console.log(user);
			})
		}
		
		model.addComment = function (content)
		{
			if ($rootScope.user != null && content != null) {
				var newComment = {
					type: "song",
					id: model.song.id,
					name: model.song.name,
					username: $rootScope.user.username,
					userId: $rootScope.user._id,
					content: content,
					date: new Date()
				};
				console.log("new comment is: ");
				console.log(newComment);
				CommentService.addComment(newComment)
					.then(function(result) {
					model.comments.push(result);
					console.log("successfully added comment");
					console.log(result);
				});	
			}
		}
		
		model.saveCommentUserId = function (userId) {
			$rootScope.currentUserId = userId;
		}
	}
})();