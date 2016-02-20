/**
 * Header Controller
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeadController);

    function HeadController($scope, $location){
        $scope.$location = $location;
        console.log($location.url());
    }

})();