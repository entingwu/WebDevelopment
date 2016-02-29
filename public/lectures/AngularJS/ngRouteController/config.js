/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){//listening everything after #, provided by framework
            $routeProvider
                .when("/", {//users level
                    templateUrl: "home/home.view.html",//physical
                    controller: "HomeController"//logical
                })
                .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({//default
                    redirectTo: "/"
                });
        });
})();