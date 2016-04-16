(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{//URL Pattern
                    templateUrl: "views/home/home.view.html"
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
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms",{
                    templateUrl: "views/forms/form.view.html",
                    controller: "FormController"
                })
                .when("/field",{
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    controllerAs: "model"
                })
                .when("/user",{
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    controllerAs : "model"
                })
                .when("/user/:userId/form/:formId/fields",{
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    controllerAs : "model"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
})();
