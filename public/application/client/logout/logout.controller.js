(function()
{
  angular
    .module("PandaMusicApp")
    .controller("LogoutController", LogoutController);
    
  function LogoutController($rootScope, $location, UserService)
  { 
		var model = this;
    model.$location = $location;
		$rootScope.user = null;
		$rootScope.loginMessage = false;
		$rootScope.loginAsAdmin = false;
		console.log("successfully logout");
		console.log($rootScope.user);
		console.log($rootScope.loginMessage);
  }
})();