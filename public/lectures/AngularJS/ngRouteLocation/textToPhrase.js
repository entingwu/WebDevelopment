/**
 * Partial pages, View
 */
(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){//listening everything after #, provided by framework
            $routeProvider
                .when("/", {
                    templateUrl: "browse.view.html"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.view.html"
                })
                .otherwise({//default
                    redirectTo: "/"
                });
        })
        .controller("NavController", function($scope, $location){
            //make the $location available to the view
            $scope.$location = $location;//create a variable $location in scope
        });
})();