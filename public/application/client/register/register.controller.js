(function()
{
  angular
    .module("PandaMusicApp")
    .controller("RegisterController", RegisterController);
    
  function RegisterController($location, $rootScope, UserService)
  {
		var model = this;
    model.$location = $location;
    
    model.register = function (registerUser) {      
      if (registerUser.username != null && registerUser.password != null && registerUser.password == registerUser.password2) {
				UserService.findUserByUsername(registerUser.username).then(function (user) {
					if (user != null) {
						model.message = "exsitedUsernameError";
					} else {
						UserService.createUser(registerUser).then(function (user) {
							$rootScope.user = user;
							$rootScope.loginMessage = true;
							model.message = "success";
							
							/*resgisted as admin*/
							if (registerUser.username == "admin" && registerUser.password == "admin") {
								model.loginAsAdmin = true;
							}
							$location.url("/profile");
							console.log("current register user is ");
							console.log($rootScope.user);
						});
					}
        });
      } else if (registerUser.username == null || registerUser.password == null || registerUser.password2 == null){
				model.message = "noFieldError";
			} else if (registerUser.password != registerUser.password2) {
				model.message = "passwordError";
			}
      
      UserService.findAllUsers().then(function (users){
        console.log("All registered users are: ")
        console.log(users);
      });
    }
  }
})();