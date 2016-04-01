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
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",{
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/register",{
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/form",{
                    templateUrl: "views/form/form.view.html",
                    controller: "FormController"
                })
                .when("/field",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController",
                    controllerAs: "model"
                })
                .when("/user",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController",
                    controllerAs : "model"
                })
                .when("/user/:userId/form/:formId/fields",{
                    templateUrl: "views/field/field.view.html",
                    controller: "FieldController",
                    controllerAs : "model"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });
})();
