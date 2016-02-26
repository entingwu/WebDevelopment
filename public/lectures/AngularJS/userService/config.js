/**
 * Created by entingwu on 2/18/16.
 */
(function()
{
    angular
        .module("UserApp")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "home.html",
                    controller: "homeController"
                })
            .when("/users",
                {
                    templateUrl: "users.html",
                    controller: "userController"
                })
            .when("/profile/:num",//call index
                {//anything after profile/ is bound to num var
                    templateUrl: "profile.html",
                    controller: "profileController"
                })
            .when("/courses",
                {
                    templateUrl: "courses.html"
                })
            .otherwise({
                redirectTo: "home"
            })
    }
})();