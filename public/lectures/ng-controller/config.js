/**
 * Created by entingwu on 2/11/16.
 */

(function(){
    angular
        .module("WhiteBoardApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home/home.view.html",//directory name/
                    controller: "HomeController"//controller name, controller just for this html file
                })
                .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();