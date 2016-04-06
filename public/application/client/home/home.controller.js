(function()
{
  angular
    .module("PandaMusicApp")
    .controller("HomeController", HomeController);
    
  function HomeController($location, $rootScope, UserService, CommentService)
  {
		var model = this;
		model.$location = $location;
		
																																	
		/*find all users and comments from database*/
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
		
		model.saveAlbum = function (albumId) {
			$rootScope.album = {id: albumId};
		}
		
		model.saveArtist = function (artistId) {
			$rootScope.artist = {id: artistId};
		}
		
		model.saveCurrentUserId = function (userId) {
			console.log("saved current user id");
			$rootScope.currentUserId = userId;
		}
		
		model.saveLocation = function () {
			$rootScope.location = "/user";
		}
		
		model.saveId = function(type, id) {
			console.log(type);
			console.log(id);
			if (type == "album") {
				console.log("redirect to album");
				$rootScope.album = {id: id};
			} else if (type == "artist") {
				console.log("redirect to artist");
				$rootScope.artist = {id: id};
			} else if (type == "song") {
				console.log("redirect to song");
				$rootScope.song = {id: id};
			}
		}
  }
})();