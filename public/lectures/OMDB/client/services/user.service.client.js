(function(){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);


    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,

            logout: logout,
            login: login,
            register: register,
            getProfile: getProfile
        };
        return api;

        function findUserByCredentials(credentials) {
            //send the credentials to server to check whether the person exists, https : security issue
            return $http.post("/api/project/login", credentials);
        }

        /* go to server to find current user, return the promise */
        function getCurrentUser() {
            return $http.get("/api/project/omdb/loggedin");
        }

        /* remember the login user in client , cache */
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function register(user) {
            return $http.post("/api/project/omdb/register", user);
        }

        function logout() {
            return $http.post("/api/project/omdb/logout");
        }

        function getProfile() {//pass current login user
            return $http.get("/api/project/omdb/profile/"+$rootScope.currentUser._id);
        }

        function login(credentials) {
            return $http.post("/api/project/omdb/login", credentials);
        }
    }
})();