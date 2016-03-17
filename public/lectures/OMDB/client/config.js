(function(){
    angular
        .module("OmdbApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {//could not go to server like profile
                templateUrl: "views/home/home.view.html",
                //just check rootScope, if refresh, rootScope lost
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"//refer to the controller instance as model
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:username?", {
                //if checkLoggedIn success, allow you to login
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                /* Before we go to profile page, first we check if sb is loggined,
                 * outside the controller that can be reused,
                 * resolve: {} : a map of dependencies */
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/details/:imdbID", {
                //retrieve the imdbID from the url and then retrieve teh details
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);//set user object to rootScope
                deferred.resolve();//whether success or not, we get to resolve, never reject to go to home page
            });

        return deferred.promise;
    }
    /* angular promise API : q, allow you to create and manage promises */
    function checkLoggedIn(UserService, $q, $location) {
        /* 1. a promise wrapped inside another promise deferred */
        var deferred = $q.defer();

        /* 2. go to server to check sb is loggined */
        UserService
            .getCurrentUser()//server returns a promise
            .then(function(response) {//==call back
                var currentUser = response.data;//object
                if(currentUser) {
                    //apply the current user to $rootScope
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();//call success
                } else {
                    deferred.reject();//call error
                    $location.url("/home");
                }
            });
        /* 3. */
        return deferred.promise;
    }
})();