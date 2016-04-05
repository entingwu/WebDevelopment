(function()
{
  angular
    .module("PandaMusicApp")
    .controller("LoginController", LoginController);
    
  function LoginController($rootScope, $location, UserService)
  { 
		var model = this;
    model.$location = $location;
    model.login = function (loginUser)
    {
      UserService
				.findUserByUsernameAndPassword(loginUser.username, loginUser.password)
				.then(function (user) {
        if (user != null) {
          $rootScope.user = user;
					model.loginDisplayMessage ="success";
					$rootScope.loginMessage = true;
					
					/*login as Admin*/
					if (user.username == "admin" && user.password == "admin") {
						$rootScope.loginAsAdmin = true;
					}
					
					/*redirect to previous location after login, or redirect to profile page*/
					if ($rootScope.location != null) {
						$location.url($rootScope.location);
					} else {
						$location.url("/profile");
					}
          
          console.log("current login user is: ");
          console.log($rootScope.user);
      	} else {
					model.loginDisplayMessage ="error";
				}
      });
      UserService
				.findAllUsers()
				.then(function(users){
        console.log("All registered users are: ")
        console.log(users);
      });
    }
  }
})();