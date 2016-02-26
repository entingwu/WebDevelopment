/**
 * Header Controller
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeadController);

    function HeadController($rootScope, $scope, $location){
        $scope.$location = $location;
        console.log($location.url());

        function ifLoggedIn(){
            return $rootScope.currenUser;
        }

        function ifAdmin(){
            return rootScope.admin;
        }
    }

})();