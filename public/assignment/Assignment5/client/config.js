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
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile",{
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkLoggedin
                    }
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/forms",{
                    templateUrl: "views/forms/form.view.html",
                    controller: "FormController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkCurrentUser
                    }
                })
                .when("/field",{
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkCurrentUser
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkAdmin
                    }
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

    var checkLoggedin = function($rootScope, $http, $q, $location) {
        var deferred = $q.defer();
        $http.get('/api/assignment5/loggedin')
            .success(function(user) {
                if(user !== '0') {
                    $rootScope.user = user;
                    console.log("checkLoggedin", user);
                    deferred.resolve(user);
                }else {
                    $location.url('/login');
                    deferred.reject();
                }
            });
        return deferred.promise;
    };

    var checkAdmin = function($rootScope, $http, $q, $location) {
        var deferred = $q.defer();
        $http.get('/api/assignment5/loggedin')
            .success(function(user) {
                if(user !== '0' && user.roles.indexOf('admin') >= 0) {
                    $rootScope.user = user;
                    console.log("checkAdmin", user);
                    deferred.resolve(user);
                }else {
                    deferred.reject();
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function($rootScope, $http, $q) {
        var deferred = $q.defer();
        $http.get('/api/assignment5/loggedin')
            .success(function(user) {
                if(user !== '0') {
                    $rootScope.user = user;
                    console.log("checkCurrentUser", user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


})();
