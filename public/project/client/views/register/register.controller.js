(function() {
  angular
    .module("MusicPlayerApp")
    .controller("RegisterController", RegisterController);
    
  function RegisterController($rootScope, $scope, $location, UserService) {
	  $scope.$location = $location;
	  $scope.register = register;

	  function register(registerUser) {
		  console.log("do register.. ", registerUser);

		  if(registerUser == null || registerUser.username == null || registerUser.password == null) {
			  $scope.alert = "Invalid Input";
			  return;
		  }
		  if(registerUser.password != registerUser.password2) {
			  $scope.alert = "Password not match";
			  return;
		  }

		  UserService
			  .register(registerUser)
			  .then(
				  function(result) {
					  var newUser = result;
					  if(newUser.username != null) {
						  $rootScope.user = newUser;
						  $('#loginModal').modal('hide');
						  $location.url("/profile");
						  console.log("register user: ", $rootScope.user);
					  }else {
						  $scope.alert = "User exists";
					  }
				  },
				  function(err) {
					  $scope.alert = err;
				  }
			  );
	  }
  }
})();