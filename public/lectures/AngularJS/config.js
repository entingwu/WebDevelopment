/**
 * Created by entingwu on 2/11/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")//use library ngRoute, dependency
        .config(function($routeProvider){//Configure
            $routeProvider
                .when("/home", {//link
                    templateUrl: "home.view.html"//destination
                })
                .when("/profile", {
                    templateUrl: "profile.view.html"
                })
                .when("/admin", {
                    templateUrl: "admin.view.html"
                })
                .otherwise({
                    redirectTo: "/"//index
                });
        })
        .controller("NavController", function($scope, $location){
            console.log("I am at: " + $location.url);//current location
            $scope.$location = $location;
        });
})();