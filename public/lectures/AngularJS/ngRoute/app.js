/**
 * Partial pages, View
 */
(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){//listening everything after #, provided by framework
            $routeProvider
                .when("/", {
                    templateUrl: "home.view.html"
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
        });
})();