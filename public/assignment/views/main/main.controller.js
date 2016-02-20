/**
 * The main controller was declared at the BODY for the document so it has the widest scope of the page. Any other
 * controllers declared inside the document will share the scope of this parent controller
 * d.	MainController() should add the $location service to the $scope.
 * You will need this in the view to highlight the links based on the URL
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController",function($scope, $location){
            $scope.$location = $location;
        });
})();