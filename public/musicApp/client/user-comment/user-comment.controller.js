(function()
{
  angular
    .module("PandaMusicApp")
    .controller("UserCommentController", UserCommentController);
    
  function UserCommentController($location, $rootScope, UserService, CommentService)
  {
    var model = this;
		model.$location = $location;

		if ($rootScope.user != null) {
			UserService.findUserById($rootScope.user._id).then(function (user) {
				model.user = user;
			});
			
			/*find current user's comments*/
			CommentService.findAllCommentsByUserId($rootScope.user._id).then(function (comments) {
				model.comments = comments;
				console.log("found user's comments");
				console.log(model.comments);
			});
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