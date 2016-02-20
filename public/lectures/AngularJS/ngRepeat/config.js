/**
 * Created by entingwu on 2/18/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                    {
                        templateUrl: "courseList/courseList.view.html",
                        controller: "courseList.controller"
                    })
                .when("/course/:index",
                    {
                        templateUrl: "courseOverview/courseOverview.view.html",
                        controller: "courseOverview.controller"
                    })
                .when("/profile",
                    {
                        templateUrl: "profile/profile.view.html",
                        controller: "profile.controller"
                    })
        });
})();