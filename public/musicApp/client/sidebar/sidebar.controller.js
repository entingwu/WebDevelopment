(function()
{
  angular
    .module("PandaMusicApp")
    .controller("SidebarController", SidebarController);
    
  function SidebarController($scope, $location)
  {
    $scope.$location = $location;
    console.log($location.url());
  }
})();