(function()
{
  angular
    .module("PandaMusicApp")
    .controller("AdminController", AdminController);
    
  function AdminController($location, $rootScope, UserService, CommentService)
  {
		var model = this;
		model.$location = $location;
		
		if ($rootScope.user != null) {
			UserService.findUserById($rootScope.user._id).then(function (user) {
				model.user = user;
				find();
			});
    }
																																	
		/*find all users and comments from database*/
		function find() {
			UserService.findAllUsers().then(function (result) {
				model.users = result;
				console.log("found all users");
				console.log(model.users);
			});
			
			CommentService.findAllComments().then(function (result) {
				model.comments = result;
				console.log("found all comments");
				console.log(model.comments);
			});
		}
		
		model.deleteUser = function (user)
    {
      UserService.deleteUserById(user._id).then(function (users) {
				console.log("successfully deleted a user");
				console.log(users);
				UserService.findAllUsers().then(function (result) {
					model.users = result;
					console.log("found all users after deleting a user");
					console.log(model.users);
				});
      });
    }
		
		model.deleteComment = function (comment)
    {
      CommentService.deleteCommentById(comment._id).then(function (comments) {
				console.log("successfully deleted a comment");
      	console.log(model.comments);
				CommentService.findAllComments().then(function (result) {
					model.comments = result;
					console.log("found all comments after deleting a comment");
					console.log(model.comments);
				});
      });
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
		
		model.saveCurrentUserId = function (userId) {
			console.log("saved current user id");
			$rootScope.currentUserId = userId;
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/user";
		}
  }
})();