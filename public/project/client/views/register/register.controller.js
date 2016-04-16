(function() {
  angular
    .module("MusicPlayerApp")
    .controller("RegisterController", RegisterController);
    
  function RegisterController($rootScope, $scope, $location, UserService) {
	  $scope.$location = $location;
	  $scope.register = register;

	  function register(registerUser) {
		  console.log("call register");
		  console.log(registerUser);
		  if (registerUser.username != null && registerUser.password != null && registerUser.password == registerUser.password2) {
			  UserService
				  .findUserByUsername(registerUser.username)
				  .then(function (user) {
					  if (user != null) {
						  $scope.alert = "User exists";
					  }else {
						  UserService.createUser(registerUser).then(function (user) {
							  $rootScope.user = user;
							  $rootScope.loginMessage = true;
							  $('#loginModal').modal('hide');

							  /*resgisted as admin*/
							  if (registerUser.username == "admin" && registerUser.password == "admin") {
								  $scope.loginAsAdmin = true;
							  }
							  $location.url("/profile");
							  console.log("current register user is ");
							  console.log($rootScope.user);
						  });
					  }
				  });
		  }else if (registerUser.username == null || registerUser.password == null || registerUser.password2 == null){
			  $scope.alert = "Invalid Input";
		  }else if (registerUser.password != registerUser.password2) {
			  $scope.alert = "Password not match";
		  }
	  }
  }
})();