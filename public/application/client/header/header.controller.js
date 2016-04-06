(function()
{
  angular
    .module("PandaMusicApp")
    .controller("HeaderController", HeaderController);
    
  function HeaderController($rootScope, $location)
  {
		var model = this;
		model.$location = $location;
		model.user = $rootScope.user;

		console.log("current login message is: ");
		console.log(model.loginMessage);
  }
})();