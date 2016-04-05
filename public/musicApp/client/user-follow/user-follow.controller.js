(function()
{
  angular
    .module("PandaMusicApp")
    .controller("UserFollowController", UserFollowController);
    
  function UserFollowController($scope, $location, $rootScope, UserService)
  {
    var model = this;
		model.$location = $location;
		
		console.log("current logged in user is: ")
		console.log($rootScope.user);

		if ($rootScope.user != null) {
			UserService.findUserById($rootScope.user._id).then(function (user) {
				model.user = user;
				model.followings = user.following;
				model.followers = user.followers;
			});
    }
		
		model.saveCurrentUserId = function (userId) {
			console.log("saved current user id");
			console.log(userId);
			$rootScope.currentUserId = userId;
		}
		
		model.deleteFollowing = function (following)
    {
      UserService.deleteFollowingFromUser(model.user._id, following.id).then(function (response) {
				UserService
					.findFollowingByUserId(model.user._id)
					.then(function (result) {
						model.followings = result;
					  console.log("successfully deleted a following");
        		console.log(model.followings);
					});
      });
			
			UserService.deleteFollowerFromUser(following.id, model.user._id).then(function (response) {
				console.log(response);
      });
    }
		
		model.deleteFollower = function (follower)
    {
      UserService.deleteFollowerFromUser(model.user._id, follower.id).then(function (response) {
				UserService
					.findFollowerByUserId(model.user._id)
					.then(function (result) {
						model.followers = result;
					  console.log("successfully deleted a follower");
        		console.log(model.followers);
					});
      });
			
			UserService.deleteFollowingFromUser(follower.id, model.user._id).then(function (response) {
				console.log(response);
      });
    }
  }
})();