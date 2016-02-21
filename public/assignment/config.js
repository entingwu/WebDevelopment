/**
 * The routing module needs to be configured with a route map that determines which HTML template to load for
 * a given URL pattern. The templates are all the HTML files under the view directory.
 * These are loaded dynamically into the DIV with the ng-view directive. For instance, we will configure that
 * if the URL contains #/home then the HTML template home.view.html will load into the ng-view
 */
(function(){
    angular
        .module("FormBuilderApp",["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                })
                .when("/login",{
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",{
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/forms",{
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
})();