(function()
{
	angular
	.module("PandaMusicApp")
	.filter('range', function() {
		return function(val, range) {
			range = parseInt(range / 20);
			for (var i=0; i<=range; i++)
				val.push(i);
			return val;
		};
	})
	.controller("ArtistController", artistController);

	function artistController($rootScope, $http, $location, SearchService, UserService, CommentService)
	{
		var model = this;
		model.$location = $location;
		model.albums = [];
		
		if ($rootScope.artist != null) {
			console.log("In artist page, current artist is: ");
			console.log($rootScope.artist);
			
		  SearchService.findArtistById($rootScope.artist.id)
				.then(function (result) {
					console.log("successfully found artist");
					console.log(result);
					model.artist = result;
					model.genres = result.genres;
					console.log(model.genres);
					
					if  ($rootScope.user != null) {
						UserService.findUserById($rootScope.user._id).then(function (user) {
							console.log("view user");
							console.log(user);
							model.user = user;
							setLikeStatus();
						});
					}
				
					SearchService.findAlbumByArtist(model.artist.id)
					.then(function (result) {
						console.log("successfully found albums");
						model.albums = result.items;
						console.log(model.albums);
					});
				
					/*get all comments for this artist from database*/
					CommentService
						.findAllCommentsByArtistId(model.artist.id)
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
					var artists = $rootScope.user.favoriteArtists;
					console.log("login user's favorite");
					console.log($rootScope.user.favoriteArtists);
					console.log(model.artist);
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
		
		model.deleteArtistFromUser = function() {
			UserService.deleteArtistFromUser($rootScope.user._id, model.artist.id)
				.then(function(result) {
					console.log("delete artist from the current login user")
					console.log(result);
					UserService.findUserById($rootScope.user._id).then(function (user) {
						model.user = user;
						setLikeStatus();
					});
				});
		}
		
		model.saveAlbum = function (album) {
			$rootScope.album = album;
			console.log("In artist page, saved album");
			console.log($rootScope.album);
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/artist";
		}
		
		model.addArtistToUser = function ()
		{
			console.log("add artist to current user: ");
			console.log($rootScope.user);
			UserService.addArtistToUser($rootScope.user._id, model.artist)
				.then(function(user) {
				console.log("successfully added song to user");
				console.log(user);
			})
		}
		
		model.addComment = function (content)
		{
			if ($rootScope.user != null && content != null) {
				var newComment = {
					type: "artist",
					id: model.artist.id,
					name: model.artist.name,
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