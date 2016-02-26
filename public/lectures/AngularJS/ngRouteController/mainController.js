/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("MainController",function($scope, $location){
            $scope.$location = $location;
        });
})();