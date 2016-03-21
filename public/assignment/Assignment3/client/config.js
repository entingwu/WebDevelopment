(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{//URL Pattern
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
                .when("/form",{
                    templateUrl: "views/form/form.view.html",
                    controller: "FormController"
                })
                .when("/field",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController"
                })
                .when("/user",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController"
                })
                .when("/user/:userId/form/:formId/fields",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
})();
