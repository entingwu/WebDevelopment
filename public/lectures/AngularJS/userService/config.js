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
                    templateUrl: "home.html"
                })
            .when("/users",
                {
                    templateUrl: "user.html",
                    controller: "userController"
                })
            .when("/profile/:id",//call index
                {//anything after profile/ is bound to id var
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