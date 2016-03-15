/**
 * Created by entingwu on 2/16/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
    }
})();