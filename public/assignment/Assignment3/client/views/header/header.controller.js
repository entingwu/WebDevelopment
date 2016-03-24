/**
 * Header Controller
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeadController);

    function HeadController($rootScope, $scope, $location){
        $scope.$location = $location;
        $scope.logout = function() {
            $rootScope.user = null;
            $location.url("/home");
        }
    }
})();